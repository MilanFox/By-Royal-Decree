import { Tile } from './tile.class';

export const tileFactory = {
  _: () => null,
  grass: (x: number, y: number) => new Tile({
    name: 'grass',
    tiling: '4x4',
    spriteSource: '/sprites/terrain/grass.png',
    x,
    y,
  }),
  sand: (x: number, y: number) => new Tile({
    name: 'sand',
    tiling: '4x4',
    spriteSource: '/sprites/terrain/sand.png',
    x,
    y,
  }),
  water: (x: number, y: number) => new Tile({
    name: 'water',
    spriteSource: '/sprites/terrain/water.png',
    x,
    y,
  }),
};

export type TileName = keyof typeof tileFactory;
