# Architecture

How **By Royal Decree** is put together, for agents and contributors. Start with
[`../AGENTS.md`](../AGENTS.md) for the high-level orientation; this file is the
detailed map.

The guiding principle: **the game core in `src/lib/` is framework-agnostic.** It
knows nothing about Vue. Vue/Pinia/Vue Router provide the app shell, reactive
state plumbing, and routing. Rendering is hand-written `<canvas>`.

---

## 1. Layers of the codebase

```
┌─────────────────────────────────────────────────────────────┐
│ Vue UI            views/ · layouts/ · components/ (atomic)    │
├─────────────────────────────────────────────────────────────┤
│ Glue              composables/ (useLevel, useRenderer, …)     │
│                   stores/ (Pinia: logic, renderer, config…)   │
├─────────────────────────────────────────────────────────────┤
│ Game core (lib/)  Level · Tile · Entity hierarchy             │  ← no Vue here
├─────────────────────────────────────────────────────────────┤
│ Content (levels/) blueprint · entities · code · validator     │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. The `Level` (`src/lib/level/`)

`Level` (`level.class.ts`) is the game-state container. Its constructor takes a
`LevelConstructorOptions` and builds everything eagerly:

- **`map`** — the blueprint (`LevelMapBlueprint`, a 2D array of tile emoji) is
  mapped through `tileFactory[emoji](x, y)` into a 2D array of `Tile | undefined`.
  `undefined` means **water** (water is the *absence* of a land tile).
- **Auto-tiling** — `#calculateSpriteTileIndex` inspects the 4 orthogonal
  neighbors and produces a 0–15 bitmask (up=1, right=2, down=4, left=8). That
  index selects which slice of a 4×4 sprite sheet a tile draws, so terrain edges
  connect seamlessly. `Tile.setSpriteTileIndex` stores it.
- **`entities`** — each entry in the blueprint's `entities` is instantiated into
  the matching class (`Pawn`, `Knight`, `Tree`, `Resource`), each receiving a
  back-reference to the `Level` (so entities can sense the world via `feel`).
- **`flatMap`** — flattened, water-removed tile list for iteration.
- **`validate`** — the level's `validator` function is stored directly as a method.

Useful getters: `pawns`, `knights`, `trees`, `resources` (each returns a copy),
`allEntities`, `allEntitiesWithCollision` (used by movement collision checks),
`waterTouchingTiles` (drives the shore "water spray" animation).

> **Known quirk:** the constructor wires up `intro`, `defaultCode`, `map`,
> `entities`, and `flatMap`, but **never assigns `title`** from the options — so
> `level.title` always returns `''`. The UI doesn't currently rely on it. If you
> need level titles, fix the constructor (`this.#properties.title = options.title`).

---

## 3. Terrain (`src/lib/terrain/`)

- **`Tile`** (`tile.class.ts`) — one grid cell. Holds position, sprite source +
  loaded `HTMLImageElement`, tiling mode (`single` | `4x4`), the computed
  `spriteTileIndex`, and a water-spray animation state. `draw(canvas, camInfo)`
  renders it through the camera transform; `update(dt)` advances the spray frames.
- **`tile.const.ts`** — `spriteTileLookup` maps the 0–15 bitmask to `(x, y)`
  coordinates inside the 4×4 sheet.
- **`index.ts`** — `tileFactory`, an object mapping each tile emoji
  (`🟩` grass, `🟨` sand, `🟦` water→`undefined`) to a `Tile` constructor.
  `TileName` is derived from its keys.

---

## 4. Entity hierarchy (`src/lib/entities/`)

```
Entity
├── MovableEntity
│   ├── Pawn
│   └── Knight
├── Tree
└── Resource
```

### The handler pattern (important)

Every class keeps its methods **thin** and delegates the real work to exported
functions in a sibling `*.handler.ts`. For example, on `MovableEntity`:

```ts
walk(dir: Direction) { return walkHandler(this, dir); }
feel(dir?: Direction) { return feelHandler(this, dir); }
```

Why: the logic stays unit-testable / independently callable, classes stay small,
and behavior is composed rather than buried in inheritance. **New behavior should
follow the same split** (`*.class.ts` method → `*.handler.ts` implementation).
Constants live in `*.const.ts`, error-message factories in `*.errors.ts`.

### `Entity` (`_base/entity/`)

Base for everything drawable. Holds position (`_x`, `_y`), `_color`, sprite sheet
refs (base/body/shade/highlight), and animation state (`_currentFrame`,
`_elapsedTime`, `_animationSpeed`, `_currentAnimation`). Handlers:
`updateAnimationHandler` (advance frames by Δt), `colorBodyHandler` (tint the body
sprite to the entity color via canvas compositing), `drawHandler` (layered draw,
horizontal flip when walking backwards, camera offset + zoom). All private fields
are exposed as getters. Flags: `_isResource`, `_hasCollision`.

### `MovableEntity` (`_base/movableEntity/`)

Adds locomotion + sensing on top of `Entity`. State getters: `speed`, `isBusy`,
`isDrowning`, `isFinished`.

- **`walk(dir)` → `Promise<void>`** — tile-stepped async movement:
  1. validate direction (orthogonal only) and state (not busy/drowning/finished),
  2. set the walking animation (an alternate cycle if carrying a resource),
  3. compute step count from `speed`,
  4. **collision retry loop** — if the target tile is occupied by a colliding
     entity, wait and retry until free,
  5. interpolate position smoothly over the step duration,
  6. snap to integer grid, then check for water → set `_isDrowning` if it drowned.
- **`feel(dir?)` → `FeelData | undefined`** — sense a tile. No arg = current tile;
  with a direction = the adjacent tile. Returns `{ landTile?, pawn?, knight?,
  tree?, resource? }`. On water, `landTile` is `undefined`.
- **`endRoutine()`** — set `_isFinished`, blocking further actions.
- **`const`** — `entityColor` enum (BLUE, WHITE, RED, LAVENDER, ORANGE, GREEN,
  BLACK, YELLOW) and `directions` (`up/right/down/left` → `{x, y}` deltas).
- **`errors`** — `UNKNOWN_DIR(dir)`, `IS_BUSY()`.

### `Pawn` (`pawn/`)

`MovableEntity` + resource handling. Adds `pickUp()` and `drop()` (delegating to
`pawn.handler.ts`), plus `heldResource` / `isHoldingResource`. Validations raise
`NO_RESOURCE_TO_PICK_UP`, `ALREADY_HOLDING_ITEM`, `NO_RESOURCE_TO_DROP`,
`BLOCKED_SPACE` (`pawns.errors.ts`). Carrying toggles an alternate walk animation.

### `Knight` (`knight/`)

`MovableEntity` with an extra highlight sprite layer. Lore-wise a combat unit;
mechanically it currently has no abilities beyond `walk`/`feel`/`endRoutine`.

### `Tree` (`tree/`)

Static `Entity`, has collision, used as an obstacle / hiding spot. Y-offset gives
a sense of depth.

### `Resource` (`resource/`)

Non-colliding `Entity` (`wood` | `gold` | `meat`). When held, its `x`/`y` getters
return the **holder's** position and its sprite offset shifts up, so it visually
rides the pawn. Exposes `heldBy`, `isBeingHeld`.

---

## 5. Stores (`src/stores/`, Pinia setup-stores)

| Store            | Holds                                                                 |
|------------------|-----------------------------------------------------------------------|
| `logic`          | `gameLogic.pawn` / `gameLogic.knight` — the compiled user functions   |
| `renderer`       | canvas layer registry, camera offset, zoom (0.5–2×), tile size        |
| `userConfig`     | `shouldRenderGrid`, `shouldAnimateSprites`, `gameSpeed` (localStorage) |
| `statusMessage`  | `levelValidationStatus` (BLANK / INVALID / VALID) + message strings   |

`renderer` defines `CanvasLayerIDs` (BACKGROUND, WATER_SPRAY, TERRAIN, GRID,
ENTITIES, CONFETTI) and the `registerLayer`/`getCanvasCtx` lifecycle used by
`CanvasLayer.vue`. `userConfig` persists via VueUse `useLocalStorage`.

---

## 6. Composables (`src/composables/`)

- **`useLevel`** — exports the `levelData` singleton (`levelData.currentLevel`)
  and `initializeLevel(id)`, which clears status and rebuilds the `Level`
  (`id` is 1-indexed into `levels[]`). Throws if the id doesn't exist.
- **`useRenderer`** — the `requestAnimationFrame` `renderLoop()`. Per frame it
  clears + redraws each layer in order: water bg → water spray → terrain → grid
  (optional) → entities (depth-sorted by y, then x; ground resources first) →
  confetti. Animations only advance if `shouldAnimateSprites` is on.
- **`useUserLogic`** — `runUserCode()` calls the compiled `gameLogic.pawn` once
  per pawn and `gameLogic.knight` once per knight.
- **`useConfetti`** — victory particle system (`spawnConfetti`, `drawConfetti`).

---

## 7. User-code execution flow (the core mechanic)

```
CodeEditor.vue (Monaco)
   │ user types JS for "pawn" and/or "knight"
   ▼ saveUserCode(scope)
logicStore.gameLogic[scope] = eval(`async (${scope}) => { ${code} }`)
   │  (syntax error → falls back to a no-op function)
   ▼ GameView.runProgram(): reset level, then…
useUserLogic().runUserCode()
   │ pawns.forEach(p => gameLogic.pawn(p))
   │ knights.forEach(k => gameLogic.knight(k))
   ▼
entity methods mutate game state; renderLoop draws every frame
   ▼ GameView.handInLevel()
level.validate(level) ? VALID + confetti : INVALID
```

Key points:
- The editor's variable **scope name becomes the function parameter name**, so the
  player's code refers to `pawn` / `knight` literally.
- The function is **`async`**, which is why `await pawn.walk(...)` works in player code.
- `eval` here is intentional and is the only place `no-eval` is disabled.
- `GameView` re-initializes the level before each run so state is fresh.

The full player-facing API is documented in [`ENTITY_API.md`](ENTITY_API.md).

---

## 8. Rendering pipeline detail

Six stacked, absolutely-positioned `<canvas>` elements (one per `CanvasLayerIDs`).
Each draw call receives a `camInfo` `{ zoomLevel, camOffset, tileSize }` and maps
grid coords to pixels as:

```
dx = gridX * tileSize + camOffset.x * zoomLevel
dy = gridY * tileSize + camOffset.y * zoomLevel
```

`GameCanvas.vue` handles drag-to-pan and wheel-to-zoom; `CanvasControls.vue`
exposes zoom/recenter/grid buttons. `recenterView` auto-fits the map.

---

## 9. Where to make common changes

| I want to…                          | Go to                                              |
|-------------------------------------|----------------------------------------------------|
| Add/modify a level                  | `src/levels/level_NN/` — see [`CREATING_LEVELS.md`](CREATING_LEVELS.md) |
| Give pawns/knights a new ability    | `entities/<type>/<type>.class.ts` + `.handler.ts` (+ errors/const) |
| Add a new entity type               | new folder under `entities/`, register in `Level` constructor + `LevelEntityBluePrint` |
| Add a new terrain tile              | `terrain/index.ts` (`tileFactory`) + a tile emoji + sprite |
| Change rendering / draw order       | `composables/useRenderer.ts`, `stores/renderer.ts` |
| Change the editor / code execution  | `components/atoms/CodeEditor/`, `composables/useUserLogic.ts`, `stores/logic.ts` |
| Add a user setting                  | `stores/userConfig.ts` + `views/SettingsView.vue`  |
| Change colors / spacing / z-index   | `src/assets/scss/_*.scss` design tokens            |
