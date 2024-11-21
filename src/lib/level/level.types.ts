import type { Tile } from '@lib/terrain/tile.class';
import type { Pawn } from '@lib/entities/pawn/pawn.class';
import type { TileName } from '@lib/terrain';

export type LevelMap = Array<Array<Tile | null>>;

export type LevelMapBlueprint = Array<Array<TileName>>;

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
  entities: EntityData;
}
