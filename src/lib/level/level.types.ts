import type { Tile } from '@lib/terrain/tile.class';
import type { Pawn } from '@lib/entities/pawn/pawn.class';
import type { TileName } from '@lib/terrain';
import type { PawnProps } from '@lib/entities/pawn';
import { Knight, type KnightProps } from '@lib/entities/knight';
import { Tree, type TreeProps } from '@lib/entities/tree';

export type Direction = 'up' | 'right' | 'down' | 'left';

export type LevelMap = Array<Array<Tile | null>>;
export type LevelMapBlueprint = Array<Array<TileName>>;

export interface LevelEntityBluePrint {
  pawns?: Array<PawnProps>;
  knights?: Array<KnightProps>;
  trees?: Array<TreeProps>;
}

export interface EntityData {
  pawns?: Pawn[];
  knights?: Knight[];
  trees?: Tree[];
}

export interface LevelData {
  map: LevelMap;
  flatMap: Tile[];
  entities: EntityData;
  intro: string;
  defaultCode?: Record<string, string>;
}

export interface LevelConstructorOptions {
  blueprint: LevelMapBlueprint;
  entities: LevelEntityBluePrint;
  intro: string;
  defaultCode?: Record<string, string>;
}

export interface SpriteTileLookupOptions {
  x: number,
  y: number,
  tileName: string,
  blueprint: LevelMapBlueprint
}
