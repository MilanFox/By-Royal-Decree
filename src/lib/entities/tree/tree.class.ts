import { baseTreeOptions, type TreeProps } from './';
import { Entity } from '@lib/entities/_base/';
import { Level } from '@lib/level/';

export class Tree extends Entity {
  constructor(options: TreeProps, level: Level) {
    const pawnOptions = { ...baseTreeOptions, ...options };
    super(pawnOptions, level);

    this.spriteSheet.base.src = '/sprites/tree/base.png';
  }
}
