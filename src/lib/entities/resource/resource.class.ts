import { Entity } from '@lib/entities/_base';
import type { Level } from '@lib/level/level.class';
import { baseResourceOptions, type ResourceProps } from './index';

export class Resource extends Entity {
  constructor(options: ResourceProps, level: Level) {
    const entityOptions = { ...baseResourceOptions, ...options };
    super(entityOptions, level);

    this.spriteSheet.base.src = `/sprites/resources/${this.name}.png`;
  }
}
