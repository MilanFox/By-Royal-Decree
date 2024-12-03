import { Entity } from '@lib/entities/_base';
import type { Level } from '@lib/level/level.class';
import { baseResourceOptions, type ResourceProps } from './index';
import { Pawn } from '@lib/entities/pawn';

export class Resource extends Entity {
  constructor(options: ResourceProps, level: Level) {
    const entityOptions = { ...baseResourceOptions, ...options };
    super(entityOptions, level);

    this.spriteSheet.base.src = `/sprites/resources/${this.name}.png`;
  }

  _heldBy?: Pawn;

  get heldBy() { return this._heldBy; }
  get isBeingHeld() { return Boolean(this._heldBy); }
  get x() { return this.isBeingHeld ? this.heldBy!.x : this._x; }
  get y() { return this.isBeingHeld ? this.heldBy!.y : this._y; }

  get spriteOffset() {
    return this.isBeingHeld
      ? { x: this._spriteOffset.x, y: this._spriteOffset.y - 32 }
      : { ...this._spriteOffset };
  }
}
