import { baseKnightOptions, type KnightProps } from './';
import { MovableEntity } from '@lib/entities/_base/';
import { Level } from '@lib/level/';

export class Knight extends MovableEntity {
  constructor(options: KnightProps, level: Level) {
    const pawnOptions = { ...baseKnightOptions, ...options };
    super(pawnOptions, level);

    this.spriteSheet.base.src = '/sprites/knight/base.png';
    this.spriteSheet.body.src = '/sprites/knight/body.png';
    this.spriteSheet.shade.src = '/sprites/knight/shade.png';
    this.spriteSheet.highlight.src = '/sprites/knight/highlight.png';

    this.colorBody();
  }
}
