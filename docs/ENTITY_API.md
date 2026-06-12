# Entity API — the in-game scripting reference

This is the API the **player** (and level default-code) uses inside the Monaco
editor to control entities. It mirrors the project
[wiki](https://github.com/MilanFox/By-Royal-Decree/wiki) and the implementation
in `src/lib/entities/`. Keep this file in sync when entity abilities change.

> The player writes the **body** of an `async (pawn) => { … }` (or `knight`)
> function. The parameter is named after the scope, so code refers to `pawn` /
> `knight` directly. The function runs **once per entity** of that type.

## Conventions

- **Instant action** = resolves synchronously, no `await` needed.
- **Timed action** = returns a `Promise`; you **must `await`** it, or the entity
  will be busy and the next command throws `IS_BUSY`.
- Directions are the strings `'up' | 'right' | 'down' | 'left'`.
- Entities **cannot swim** — walking into water sets `isDrowning` (terminal).

---

## Pawn

Basic, defenseless worker. Gathers and carries resources. Extends the movable
base, so it has every movable method **plus** `pickUp` / `drop`.

### Getters

| Name               | Type                    | Notes                                  |
|--------------------|-------------------------|----------------------------------------|
| `x` / `y`          | `number`                | grid position                          |
| `name`             | `'pawn'`                |                                        |
| `color`            | `string` (hex)          | e.g. `'#ff0000'`                        |
| `isDrowning`       | `boolean`               | walked into water                      |
| `isFinished`       | `boolean`               | `endRoutine()` was called              |
| `isHoldingResource`| `boolean`               |                                        |
| `heldResource`     | `Resource \| undefined` | the carried resource, if any           |

### Methods

| Method        | Instant? | Params                        | Returns      | Description |
|---------------|----------|-------------------------------|--------------|-------------|
| `walk(dir)`   | No       | `'up'\|'right'\|'down'\|'left'`| `Promise`    | Move one tile. **`await` it.** Can't cross water. Auto-retries if the target tile is blocked. |
| `feel(dir?)`  | Yes      | direction or none             | `FeelData`   | Sense surroundings. No arg → current tile; with a direction → adjacent tile. |
| `pickUp()`    | Yes      | —                             | `void`       | Pick up the resource on the current tile. Only one at a time. |
| `drop()`      | Yes      | —                             | `void`       | Drop the held resource on the current tile. |
| `endRoutine()`| Yes      | —                             | `void`       | Mark this pawn done; blocks further actions. |

Error cases (thrown via `pawns.errors.ts` / `movableEntity.errors.ts`):
`IS_BUSY`, `UNKNOWN_DIR`, `NO_RESOURCE_TO_PICK_UP`, `ALREADY_HOLDING_ITEM`,
`NO_RESOURCE_TO_DROP`, `BLOCKED_SPACE`.

---

## Knight

Powerful combat unit (lore). Mechanically it currently shares the movable API
with the pawn but has **no** `pickUp`/`drop`.

### Getters

| Name         | Type           | Notes                     |
|--------------|----------------|---------------------------|
| `x` / `y`    | `number`       | grid position             |
| `name`       | `'knight'`     |                           |
| `color`      | `string` (hex) |                           |
| `isDrowning` | `boolean`      | walked into water         |
| `isFinished` | `boolean`      | `endRoutine()` was called |

### Methods

| Method        | Instant? | Params                         | Returns    | Description |
|---------------|----------|--------------------------------|------------|-------------|
| `walk(dir)`   | No       | `'up'\|'right'\|'down'\|'left'` | `Promise`  | Move one tile. **`await` it.** Can't cross water. |
| `feel(dir?)`  | Yes      | direction or none              | `FeelData` | Sense surroundings (see Pawn). |
| `endRoutine()`| Yes      | —                              | `void`     | Mark this knight done. |

---

## FeelData (returned by `feel()`)

A container describing what's at the sensed tile. Every field is optional —
present only if something is there.

| Field       | Type                 | Meaning                                   |
|-------------|----------------------|-------------------------------------------|
| `landTile`  | `Tile \| undefined`  | the tile; **`undefined` means water**     |
| `pawn`      | `Pawn?`              | a pawn on the tile                        |
| `knight`    | `Knight?`            | a knight on the tile                      |
| `tree`      | `Tree?`              | a tree on the tile                        |
| `resource`  | `Resource?`          | a resource on the tile                    |

`feel()` itself returns `undefined` when sensing off-map. Always guard:

```js
const here = pawn.feel();
if (here?.resource?.name === 'gold') pawn.pickUp();
```

---

## Tile

Terrain the entities stand on. **Only land tiles exist** — water is the lack of a
tile, so `feel()` on the sea yields `landTile: undefined`.

| Getter | Type                 | Notes              |
|--------|----------------------|--------------------|
| `x`/`y`| `number`             | grid position      |
| `name` | `'grass' \| 'sand'`  | more terrain TBD   |

---

## Resource

Carriable item. Picked up and transported by pawns.

| Getter        | Type                    | Notes                                 |
|---------------|-------------------------|---------------------------------------|
| `x` / `y`     | `number`                | grid position (the holder's, if held) |
| `name`        | `'gold'\|'meat'\|'wood'`|                                       |
| `isBeingHeld` | `boolean`               |                                       |
| `heldBy`      | `Pawn \| undefined`     | the pawn carrying it                  |

---

## Tree

Static obstacle. Blocks movement; useful to hide things (or pawns) behind/under.

| Getter | Type      | Notes         |
|--------|-----------|---------------|
| `x`/`y`| `number`  | grid position |
| `name` | `'tree'`  |               |

---

## Worked example (level_03 default — "Easter Egg Hunt")

Walk east probing each tile; when gold is found, pick it up and carry it to the
front of the tree, then stop:

```js
while (true) {
  await pawn.walk('right');
  const curPos = pawn.feel();

  if (curPos.resource && curPos.resource.name === 'gold') {
    pawn.pickUp();
    await pawn.walk('right');
    await pawn.walk('down');
    await pawn.walk('down');
    await pawn.walk('left');
    pawn.drop();
    break;
  }
}

await pawn.walk('left');
pawn.endRoutine();
```

> Each entity getter/method that isn't listed here exists only for rendering or
> level validation and is not part of the player-facing contract.
