import { Entity, type EntityProps } from '@lib/entities/_base/';
import type { Tile } from '@lib/terrain/tile.class';

export interface MovableEntityProps extends EntityProps {
  speed: number;
}

export interface FeelData {
  entity?: Entity;
  landTile?: Tile;
}
