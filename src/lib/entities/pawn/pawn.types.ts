import type { EntityConstructorOptions } from '@lib/entities/entity.types';
import type { pawnColors } from '@lib/entities/pawn/pawn.const';

export interface PawnProperties {
  color: pawnColors;
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
