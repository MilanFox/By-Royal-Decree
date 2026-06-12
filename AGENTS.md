# AGENTS.md — By Royal Decree

> Working notes for AI coding agents (and humans). This is the canonical entry
> point. `CLAUDE.md` imports this file; other tools should read it directly.

## What this project is

**By Royal Decree** is a grid-based **coding puzzle game**. The player writes
JavaScript in an in-browser Monaco editor to drive medieval-themed entities
(pawns, knights) across a 2D tile grid to satisfy a level's win condition.

It is a **from-scratch learning project**: the renderer, the game loop, and the
"engine" are all hand-written. Vue/Pinia/Vue Router exist only for app shell,
state, and routing. Treat the custom code in `src/lib/` as the heart of the
project — do not replace it with a game library.

- **Live build:** https://by-royal-decree.vercel.app/
- **Status:** heavily WIP / experimental. Things change and break by design.
- **Public wiki (entity reference):** https://github.com/MilanFox/By-Royal-Decree/wiki
  — mirrored locally in [`docs/ENTITY_API.md`](docs/ENTITY_API.md).

## Tech stack

| Concern        | Choice                                              |
|----------------|-----------------------------------------------------|
| Framework      | Vue 3 (`<script setup>`, Composition API)           |
| Language       | TypeScript (strict), ESM only (`"type": "module"`)  |
| State          | Pinia (setup-store style)                           |
| Routing        | Vue Router                                          |
| Build / dev    | Vite                                                |
| Editor widget  | Monaco (`@guolao/vue-monaco-editor`)                |
| Styling        | SCSS, BEM, `px`→`rem` via PostCSS                   |
| Rendering      | Hand-written `<canvas>` layers (no game engine)     |
| Node           | **22** (see `.nvmrc`); CI runs Node 22              |

## Commands

```bash
npm install        # install deps (Node 22 — run `nvm use` first)
npm run dev        # Vite dev server → http://localhost:5173
npm run build      # type-check (vue-tsc) + production build
npm run preview    # preview the production build
npm run type-check # vue-tsc --build --force (no emit)
npm run lint       # ESLint --fix AND Stylelint --fix (mutates files)
npm run lint:js    # ESLint only
npm run lint:style # Stylelint only
```

There is **no test runner** configured. "Verification" means: it type-checks,
it lints clean, and it behaves correctly when run in the browser
(`npm run dev`). The only CI gate is **`npm run lint`** (`.github/workflows/lint-check.yml`)
— note CI runs lint, which with `--fix` can mutate; keep the tree lint-clean so
nothing is left to fix.

## Repository map

```
src/
├── main.ts, App.vue          # app bootstrap
├── router/                   # Vue Router routes
├── views/                    # route-level pages: Home, Game, Settings
├── layouts/                  # DoublePageLayout (the "book" UI shell)
├── components/               # atomic design: atoms / molecules / organisms
│   ├── atoms/                #   CodeEditor, CanvasLayer, buttons, StatusMessage…
│   ├── molecules/            #   GameCanvas, CanvasControls, Navigation, Footer…
│   └── organisms/            #   Header
├── composables/              # useLevel, useRenderer, useUserLogic, useConfetti
├── stores/                   # Pinia: logic, renderer, userConfig, statusMessage
├── lib/                      # ★ THE ENGINE — framework-agnostic game core
│   ├── level/                #   Level class + types (constructs the map/entities)
│   ├── terrain/              #   Tile class, tileFactory, 4×4 auto-tiling
│   ├── entities/             #   Entity hierarchy (see below)
│   └── types/                #   shared utility types (Color, PartiallyRequired)
├── levels/                   # ★ LEVEL CONTENT — one folder per level
│   ├── index.ts              #   auto-loads all level_* folders via import.meta.glob
│   └── level_01/ …_02/ …_03/ #   blueprint, entities, code, validator, text
└── assets/scss/              # design tokens (_colors, _z-index, _variables…)
public/                       # sprites, icons, fonts, button art (served as-is)
```

### Entity class hierarchy (`src/lib/entities/`)

```
Entity (_base/entity)               ← sprite, color, animation, draw()
├── MovableEntity (_base/movableEntity)  ← walk(), feel(), endRoutine(), collision
│   ├── Pawn   (pawn/)              ← + pickUp(), drop(), heldResource
│   └── Knight (knight/)           ← combat unit (currently no extra abilities)
├── Tree     (tree/)               ← static obstacle
└── Resource (resource/)           ← carriable item (wood | gold | meat)
```

Deep dive: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Conventions (match these — they are enforced)

**File layout per unit.** A class/feature is split across sibling files by role,
re-exported from `index.ts`:
- `*.class.ts` — the class. Methods are thin and **delegate to handlers**.
- `*.handler.ts` — the actual logic (`walkHandler(entity, dir)` etc.). This keeps
  classes small and the logic independently callable. Follow this pattern.
- `*.types.ts` — types/interfaces. `*.const.ts` — constants/defaults. `*.errors.ts` — error message factories.
- Vue components live in a folder with `Name.vue` + optional `Name.types.ts` / `Name.src.ts`.

**Imports** use path aliases (see `vite.config.ts` + `tsconfig.app.json`):
`@`, `@lib`, `@levels`, `@stores`, `@composables`, `@layouts`, `@components`,
`@atoms`, `@molecules`, `@organisms`, `@assets`, `@icons`. Prefer these over
long relative paths.

**Code style** (ESLint `eslint.config.js`, Stylelint `stylelint.config.js`):
- 2-space indent, single quotes, **semicolons required**, max line length **120**.
- `func-style: expression` → write `const f = () => {}`, **not** `function f(){}`.
- `eqeqeq`, `no-eval` (the CodeEditor is the *one* sanctioned exception, with an inline disable), `no-shadow`, `radix`, `max-depth: 3`, `max-params: 3`.
- Private class state via `#private` fields exposed through getters (see `Level`).
- Stores are Pinia **setup stores** (`defineStore('x', () => {…})`).
- Vue SFC block order: `template`, `script`, `style`.

**Commits** use Conventional Commits, enforced by commitlint + a Husky
`pre-commit` hook. History is kept linear (squash/rebase merges only). PRs target
the protected `main` branch and must pass the lint CI.

## How the game actually runs (the 30-second version)

1. `GameView.vue` loads a level via `useLevel().initializeLevel(id)` → builds a
   fresh `Level` (`levelData.currentLevel`).
2. `useRenderer` runs a `requestAnimationFrame` loop drawing stacked `<canvas>`
   layers (background → water spray → terrain → grid → entities → confetti).
3. **Run Code**: each `CodeEditor` compiles the player's text into an `async`
   function via `eval` and stores it in the Pinia `logic` store, keyed by scope
   (`pawn` / `knight`). `useUserLogic().runUserCode()` calls that function once
   **per entity** of that type, passing the entity in as the named argument.
4. Player code drives entities with the async API: `await pawn.walk('right')`,
   `pawn.feel()`, `pawn.pickUp()`, `pawn.drop()`, `pawn.endRoutine()`.
5. **Validate Solution**: runs the level's `validator(level)` → confetti on pass,
   status message on fail.

Full flow + the entity scripting API: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
and [`docs/ENTITY_API.md`](docs/ENTITY_API.md).

## Adding a level (most common task)

Create `src/levels/level_NN/` with `blueprint`, `entities`, `text`, `code`,
`validator`, and an `index.ts`. The loader picks it up automatically. Full
recipe: [`docs/CREATING_LEVELS.md`](docs/CREATING_LEVELS.md).

> Note: `README.md`/`CONTRIBUTING.md` still say levels live in
> `src/lib/levels/data/level_01.js`. That path is **stale**. The real location is
> `src/levels/level_NN/` (TypeScript, multi-file). Trust the code, not those docs.

## Gotchas / sharp edges

- **No tests.** Don't claim a change "passes tests." Verify via type-check, lint,
  and the running app.
- **`npm run lint` auto-fixes (mutates files).** Run it intentionally; review the diff.
- **User code runs through `eval`** in `CodeEditor.vue` — that's deliberate and the
  only place `no-eval` is disabled. Don't "fix" it.
- **`Level.title` is never set** by the constructor (only `intro` is wired up), so
  `level.title` is always `''`. Known quirk — see `docs/ARCHITECTURE.md`.
- **Water = absence of a land tile.** Blueprints define land (`🟩`/`🟨`); `🟦` is
  just "no tile". `feel()` on water returns `undefined` for `landTile`. Entities
  that walk into water drown (`isDrowning`).
- **Sprites/art are CC-non-commercial** (Pixel Frog, iconfield, Sharkshock). This
  is a non-commercial learning project; keep it that way (see `README.md` credits).
- Movement is **async + tile-stepped** with collision retry; player code must
  `await` `walk()` or commands stack incorrectly (`IS_BUSY` error).
```
