import { basePawnOptions, type PawnProps } from './';
import { MovableEntity } from '@lib/entities/_base/';
import type { Level } from '@lib/level/level.class';
import { Resource } from '@lib/entities/resource';
import { dropHandler, pickUpHandler } from '@lib/entities/pawn/pawn.handler';

export class Pawn extends MovableEntity {
  constructor(options: PawnProps, level: Level) {
    const pawnOptions = { ...basePawnOptions, ...options };
    super(pawnOptions, level);

    this.spriteSheet.base.src = '/sprites/pawn/base.png';
    this.spriteSheet.body.src = '/sprites/pawn/body.png';
    this.spriteSheet.shade.src = '/sprites/pawn/shade.png';
    this.colorBody();
  }

  _heldResource?: Resource;

  get heldResource() { return this._heldResource; }
  get isHoldingResource() { return Boolean(this._heldResource); }

  pickUp = () => { pickUpHandler(this); };
  drop = () => { dropHandler(this); };
}
