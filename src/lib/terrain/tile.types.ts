import type { PartiallyRequired } from '@lib/types';
import type { Tile } from './tile.class';

type SpriteTilingType = 'single' | '4x4';

export interface TileProperties {
  name: string;
  spriteSource: string;
  sprite: HTMLImageElement;
  spriteSize: number;
  tiling: SpriteTilingType;
  x: number;
  y: number;
  floorTile?: Tile;
  spriteTileIndex: number;
  waterSpray: {
    sprite: HTMLImageElement,
    elapsedTime: number,
    animationSpeed: number,
    spriteFrames: number,
    currentFrame: number,
    spriteSize: number
  },
}

export type TileConstructorOptions = PartiallyRequired<TileProperties, 'spriteSource' | 'name'>;
