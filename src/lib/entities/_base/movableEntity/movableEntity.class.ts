import { type Direction, Level } from '@lib/level/';
import { Entity } from '@lib/entities/_base/';
import { endRoutineHandler, walkHandler, type MovableEntityProps } from './';

export class MovableEntity extends Entity {
  constructor(options: Partial<MovableEntityProps>, level: Level) {
    super(options, level);
  }

  _speed = 2;
  _isBusy = false;
  _isDrowning = false;
  _isFinished = false;

  get speed() { return this._speed; }
  get isBusy() { return this._isBusy; }
  get isDrowning() { return this._isDrowning; }
  get isFinished() { return this._isFinished; }

  endRoutine = () => { endRoutineHandler(this); };
  walk = (dir: Direction) => { return walkHandler(this, dir); };
}

