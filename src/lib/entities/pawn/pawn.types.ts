import type { EntityConstructorOptions } from '@lib/entities/entity.types';
import type { Color } from '@lib/types';

export interface PawnProperties {
  color: Color;
  spriteSheet: {
    base: HTMLImageElement
    body: HTMLImageElement
    shade: HTMLImageElement
  };
  spriteSize: number;
  spriteFrames: number;
  currentFrame: number;
  elapsedTime: number;
  animationSpeed: number;
  currentAnimation: number;
}

export interface PawnConstructorOptions {
  entityOptions?: EntityConstructorOptions;
  pawnOptions?: Partial<PawnProperties>;
}
