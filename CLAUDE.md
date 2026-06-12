# CLAUDE.md

The full agent guide for this repository lives in **`AGENTS.md`**. Read it first.

@AGENTS.md

## Quick reference

- **Stack:** Vue 3 + TS + Pinia + Vite. A grid-based coding-puzzle game with a
  hand-written canvas renderer and game loop in `src/lib/`.
- **Run:** `npm run dev` (Node 22). **Check:** `npm run type-check` + `npm run lint`.
  There are **no automated tests** — verify behavior in the browser.
- **Engine:** `src/lib/` (level, terrain, entities). **Content:** `src/levels/level_NN/`.
- **Deeper docs:** `docs/ARCHITECTURE.md`, `docs/ENTITY_API.md`, `docs/CREATING_LEVELS.md`.
- **Conventions:** handler-pattern classes (`*.class.ts` delegates to `*.handler.ts`),
  path aliases (`@lib`, `@levels`, …), Conventional Commits, lint must stay clean.
