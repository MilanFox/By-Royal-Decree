import type { Tile } from '@lib/terrain/tile.class';
import type { Pawn } from '@lib/entities/pawn/pawn.class';
import type { TileName } from '@lib/terrain';
import type { PawnConstructorOptions } from '@lib/entities/pawn/pawn.types';

export type Direction = 'up' | 'right' | 'down' | 'left';

export type LevelMap = Array<Array<Tile | null>>;
export type LevelMapBlueprint = Array<Array<TileName>>;

export interface LevelEntityBluePrint {
  pawns: Array<PawnConstructorOptions>;
}

export interface EntityData {
  pawns: Pawn[];
}

export interface LevelData {
  map: LevelMap;
  flatMap: Tile[];
  entities: EntityData;
}

export interface LevelConstructorOptions {
  blueprint: LevelMapBlueprint;
  entities: LevelEntityBluePrint;
}

export interface SpriteTileLookupOptions {
  x: number,
  y: number,
  tileName: string,
  blueprint: LevelMapBlueprint
}
