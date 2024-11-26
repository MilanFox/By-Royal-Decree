import type { pawnColors } from '@lib/entities/pawn/pawn.const';
import type { PartiallyRequired } from '@lib/types';

export interface PawnProperties {
  x: number;
  y: number;
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
  speed: number;
  blockedPosition: { x: number, y: number };
}

export type PawnConstructorOptions = PartiallyRequired<PawnProperties, 'x' | 'y' | 'color'>;
