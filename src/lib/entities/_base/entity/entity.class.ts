import { Level } from '@lib/level/';
import { entityColor } from '@lib/entities/_base';
import { type EntityProps, updateAnimationHandler, colorBodyHandler, drawHandler } from './';
import type { CamInfo } from '@composables/useRenderer';
import type { Color } from '@lib/types';

export class Entity {
  constructor(options: Partial<EntityProps>, level: Level) {
    this._level = level;
    Object.entries(options).forEach(([key, val]) => {
      if (key in this) (this as Record<string, unknown>)[`_${key}`] = val;
    });

    this._blockedPosition.x = this.x;
    this._blockedPosition.y = this.y;
  }

  _color: Color | entityColor = entityColor.WHITE;
  _spriteSize = 64;
  _spriteFrames = 1;
  _spriteOffset = { x: 0, y: 0 };
  _currentFrame = 0;
  _elapsedTime = 0;
  _animationSpeed = 10;
  _currentAnimation = 0;
  _isWalkingBackwards = false;
  _x = 0;
  _y = 0;
  _level: Level;
  _spriteSheet = { base: new Image(), body: new Image(), shade: new Image(), highlight: new Image() };
  _blockedPosition = { x: 0, y: 0 };
  _name = 'UNDEFINED';

  get name() { return this._name; }
  get color() { return this._color; }
  get spriteSize() { return this._spriteSize; }
  get spriteFrames() { return this._spriteFrames; }
  get spriteOffset() { return { ...this._spriteOffset }; }
  get currentFrame() { return this._currentFrame; }
  get elapsedTime() { return this._elapsedTime; }
  get animationSpeed() { return this._animationSpeed; }
  get currentAnimation() { return this._currentAnimation; }
  get spriteSheet() { return this._spriteSheet;}
  get isWalkingBackwards() { return this._isWalkingBackwards; }
  get x() { return this._x; }
  get y() { return this._y; }
  get blockedPosition() { return { ...this._blockedPosition }; }

  updateAnimation = (deltaTime: number) => { updateAnimationHandler(this, deltaTime); };
  colorBody = () => { colorBodyHandler(this); };
  draw = (canvas: CanvasRenderingContext2D, camInfo: CamInfo) => { drawHandler(this, canvas, camInfo); };
}
