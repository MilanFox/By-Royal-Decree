import type { EntityConstructorOptions, EntityProperties } from '@lib/entities/entity.types';

export class Entity {
  constructor(options: EntityConstructorOptions = {}) {
    this.#properties = { ...this.#properties, ...options };
  }

  #properties: EntityProperties = {
    x: 0, y: 0,
  };

  get x() {
    return this.#properties.x;
  }

  get y() {
    return this.#properties.y;
  }
}
