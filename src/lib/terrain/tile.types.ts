import type { PartiallyRequired } from '@lib/types';
import type { Tile } from './tile.class';

type SpriteTilingType = 'single' | '4x4';

export interface TileProperties {
  name: string;
  isWalkable: boolean;
  spriteSource: string;
  sprite: HTMLImageElement;
  spriteSize: number;
  tiling: SpriteTilingType;
  x: number;
  y: number;
  isBlocked: boolean;
  floorTile?: Tile;
  isVoid: boolean;
  spriteTileIndex: number;
}

export type TileConstructorOptions = PartiallyRequired<TileProperties, 'spriteSource' | 'name'>;
