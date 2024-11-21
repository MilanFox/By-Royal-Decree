import type { TileConstructorOptions, TileProperties } from './tile.types';
import type { CamInfo } from '@composables/useRenderer';
import { spriteTileLookup } from '@lib/terrain/tile.const';

export class Tile {
  constructor(options: TileConstructorOptions) {
    this.#properties = { ...this.#properties, ...options };
    this.#properties.sprite.src = this.#properties.spriteSource;
  }

  #properties: TileProperties = {
    name: 'UNDEFINED',
    isWalkable: false,
    spriteSource: 'UNDEFINED',
    sprite: new Image(),
    tiling: 'single',
    x: 0,
    y: 0,
    isBlocked: false,
    isVoid: false,
    spriteSize: 64,
    spriteTileIndex: 0,
  };

  get name() {
    return this.#properties.name;
  }

  get x() {
    return this.#properties.x;
  }

  get y() {
    return this.#properties.y;
  }

  get isWalkable() {
    return this.#properties.isWalkable;
  }

  get isBlocked() {
    return this.#properties.isBlocked;
  }

  get isVoid() {
    return this.#properties.isVoid;
  }

  get sprite() {
    return this.#properties.sprite;
  }

  get tiling() {
    return this.#properties.tiling;
  }

  get spriteSize() {
    return this.#properties.spriteSize;
  }

  get spriteTileIndex() {
    return this.#properties.spriteTileIndex;
  }

  setSpriteTileIndex(type: number) {
    this.#properties.spriteTileIndex = type;
  }

  draw(canvas: CanvasRenderingContext2D, { camOffset, zoomLevel, tileSize }: CamInfo) {
    let sx = 0;
    let sy = 0;

    if (this.tiling === '4x4') {
      const { x, y } = spriteTileLookup[this.spriteTileIndex as keyof typeof spriteTileLookup];
      sx = x * this.spriteSize;
      sy = y * this.spriteSize;
    }

    const { sprite } = this;
    const sWidth = this.spriteSize;
    const sHeight = this.spriteSize;
    const dx = this.x * tileSize + (camOffset.x * zoomLevel);
    const dy = this.y * tileSize + (camOffset.y * zoomLevel);
    const dWidth = tileSize;
    const dHeight = tileSize;

    canvas.drawImage(sprite, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }
}
