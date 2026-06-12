# Creating a level

Adding a level is the most common contribution. A level is a folder of small
TypeScript files; the loader discovers it automatically.

> **Heads-up:** `README.md` / `CONTRIBUTING.md` still describe the old path
> `src/lib/levels/data/level_01.js`. That is **stale**. Levels now live in
> `src/levels/level_NN/` as the multi-file TypeScript structure below.

## How levels are loaded

`src/levels/index.ts` globs every `./level_*/index.ts` eagerly and builds the
`levels[]` array. `useLevel().initializeLevel(id)` then constructs the level for
the route's **1-indexed** id (`level_01` is id `1`). No registration step — just
create the folder.

```ts
// src/levels/index.ts (already exists)
const modules = import.meta.glob('./level_*/index.ts', { eager: true });
```

## Folder layout

Copy an existing folder (e.g. `level_01/`) and edit. Each level has:

```
src/levels/level_NN/
├── index.ts            # assembles the pieces into the level object
├── level.blueprint.ts  # the map (2D emoji grid)
├── level.entities.ts   # what spawns and where
├── level.text.ts       # title + intro shown to the player
├── level.code.ts       # default starter code in the editor
└── level.validator.ts  # win condition
```

### `index.ts` — assemble (always the same shape)

```ts
import { blueprint } from './level.blueprint';
import { entities } from './level.entities';
import { intro, title } from './level.text';
import { defaultCode } from './level.code';
import { validator } from './level.validator';

export default { title, intro, blueprint, entities, defaultCode, validator };
```

### `level.blueprint.ts` — the map

A 2D array of tile emoji. `🟩` = grass, `🟨` = sand, `🟦` = water. **Water is the
absence of land** — `🟦` becomes no tile. Rows may differ in length (ragged maps
are fine; missing cells are water). Indices are `[y][x]`, `(0,0)` top-left.

```ts
import type { LevelMapBlueprint } from '@/levels';

export const blueprint: LevelMapBlueprint = [
  ['🟦', '🟦', '🟩', '🟩', '🟩'],
  ['🟦', '🟩', '🟩', '🟩', '🟩', '🟩'],
  ['🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩'],
];
```

Edge/corner sprites are auto-selected from neighbors — you don't pick tile
variants by hand.

### `level.entities.ts` — spawns

Keys are optional: `pawns`, `knights`, `trees`, `resources`
(`LevelEntityBluePrint`). Pawns and knights **require** `x`, `y`, `color`; trees
require `x`, `y`; resources require `x`, `y`, `name` (`'gold' | 'meat' | 'wood'`).
Use the `entityColor` enum for colors.

```ts
import type { LevelEntityBluePrint } from '@/levels';
import { entityColor } from '@lib/entities/_base';

export const entities: LevelEntityBluePrint = {
  pawns: [
    { x: 1, y: 1, color: entityColor.RED },
    { x: 3, y: 3, color: entityColor.BLUE },
  ],
  knights: [
    { x: 6, y: 1, color: entityColor.RED },
  ],
  trees: [{ x: 3, y: 1 }],
  resources: [{ x: 4, y: 2, name: 'gold' }],
};
```

> Tip: spawn coordinates must land on a land tile, or the entity starts in water
> and drowns immediately. You can compute positions (e.g. `level_03` hides gold
> behind a random tree using `Math.random()`), but keep levels solvable.

### `level.text.ts` — narrative

```ts
export const title = 'Easter Egg Hunt';
export const intro = 'I\'ve misplaced a sack of gold in my woods. Fetch it…';
```

> `intro` is displayed in the game UI. `title` is currently **not** rendered
> (the `Level` constructor doesn't wire it up — see `docs/ARCHITECTURE.md`), but
> set it anyway so it's correct once that's fixed.

### `level.code.ts` — starter code

A map of scope → starter source string. Only include scopes the level uses; the
editor tab appears only when matching entities exist. The string is the **body**
of an `async (pawn) => { … }`, so you may use `await`.

```ts
const pawn =
  `await pawn.walk('up');
pawn.endRoutine();`;

export const defaultCode = { pawn };
// add `const knight = \`…\`` and `{ pawn, knight }` if the level has knights
```

### `level.validator.ts` — win condition

A pure `(level: Level) => boolean`. Inspect entity/tile positions and return
`true` when solved. Build it from small predicates; common pattern is
`level.pawns.every(...)` / `level.resources.every(...)`.

```ts
import type { Level } from '@lib/level/level.class';
import { Pawn } from '@lib/entities/pawn';

// level_01: every pawn must end up hidden under a tree (tree directly below it)
export const validator = (level: Level) => {
  const isHidden = (pawn: Pawn) =>
    Boolean(level.trees.find(tree => tree.x === pawn.x && tree.y === pawn.y + 1));
  return level.pawns.every(isHidden);
};
```

Available on `level` for checks: `pawns`, `knights`, `trees`, `resources`,
`map`, `flatMap`. Resources expose `isBeingHeld` / `heldBy` (see
[`ENTITY_API.md`](ENTITY_API.md)).

## Checklist before committing

- [ ] Folder named `level_NN` (zero-padded, sequential). `camelcase` lint allows `level_*`.
- [ ] `index.ts` exports the assembled object as `default`.
- [ ] Every spawn sits on a land tile; the level is solvable with the API.
- [ ] `validator` returns `true` only for genuinely-correct solutions.
- [ ] `defaultCode` only references scopes whose entities exist.
- [ ] `npm run type-check` and `npm run lint` are clean.
- [ ] Played it in `npm run dev`: Run Code → Validate → confetti.
- [ ] Conventional-commit message, e.g. `feat(levels): add level_04 "<name>"`.
