import { type EntityProps } from '@lib/entities/_base/';
import type { Tile } from '@lib/terrain/tile.class';
import { Resource } from '@lib/entities/resource';
import { Pawn } from '@lib/entities/pawn';
import { Knight } from '@lib/entities/knight';
import { Tree } from '@lib/entities/tree';

export interface MovableEntityProps extends EntityProps {
  speed: number;
}

export interface FeelData {
  pawn?: Pawn;
  knight?: Knight;
  tree?: Tree;
  resource?: Resource;
  landTile?: Tile;
}
