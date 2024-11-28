import { Level } from '@lib/level/';
import type { Color } from '@lib/types';
import { entityColor } from '@lib/entities/_base';

export interface EntityProps {
  x: number;
  y: number;
  level: Level;
  color: entityColor | Color;
  spriteSize: number;
  spriteFrames: number;
  currentFrame: number;
  elapsedTime: number;
  animationSpeed: number;
  currentAnimation: number;
  spriteSheet: {
    base: HTMLImageElement,
    body?: HTMLImageElement,
    shade?: HTMLImageElement
    highlight?: HTMLImageElement,
  };
}
