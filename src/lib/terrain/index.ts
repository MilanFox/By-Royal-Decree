import { Tile } from './tile.class';

export const tileFactory = {
  '🟦': () => undefined,
  '🟩': (x: number, y: number) => new Tile({
    name: 'grass',
    tiling: '4x4',
    spriteSource: '/sprites/terrain/grass.png',
    x,
    y,
  }),
  '🟨': (x: number, y: number) => new Tile({
    name: 'sand',
    tiling: '4x4',
    spriteSource: '/sprites/terrain/sand.png',
    x,
    y,
  }),
};

export type TileName = keyof typeof tileFactory;
