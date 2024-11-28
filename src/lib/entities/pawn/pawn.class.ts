import { basePawnOptions, type PawnProps } from './';
import { MovableEntity } from '@lib/entities/_base/';
import { Level } from '@lib/level/';

export class Pawn extends MovableEntity {
  constructor(options: PawnProps, level: Level) {
    const pawnOptions = { ...basePawnOptions, ...options };
    super(pawnOptions, level);

    this.spriteSheet.base.src = '/sprites/pawn/base.png';
    this.spriteSheet.body.src = '/sprites/pawn/body.png';
    this.spriteSheet.shade.src = '/sprites/pawn/shade.png';
    this.colorBody();
  }
}
