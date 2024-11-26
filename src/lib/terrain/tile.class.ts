import type { TileConstructorOptions, TileProperties } from './tile.types';
import type { CamInfo } from '@composables/useRenderer';
import { spriteTileLookup } from '@lib/terrain/tile.const';

export class Tile {
  constructor(options: TileConstructorOptions) {
    this.#properties = { ...this.#properties, ...options };

    this.#properties.sprite.src = this.#properties.spriteSource;
    this.#properties.waterSpray.sprite.src = '/sprites/terrain/waterSpray.png';
  }

  readonly #properties: TileProperties = {
    name: 'UNDEFINED',
    spriteSource: 'UNDEFINED',
    sprite: new Image(),
    tiling: 'single',
    x: 0,
    y: 0,
    spriteSize: 64,
    spriteTileIndex: 0,
    waterSpray: {
      sprite: new Image(),
      elapsedTime: 0,
      animationSpeed: 10,
      spriteFrames: 8,
      currentFrame: 0,
      spriteSize: 192,
    },
  };

  get name() { return this.#properties.name; }
  get x() { return this.#properties.x; }
  get y() { return this.#properties.y; }
  get sprite() { return this.#properties.sprite; }
  get tiling() { return this.#properties.tiling; }
  get spriteSize() { return this.#properties.spriteSize; }
  get spriteTileIndex() { return this.#properties.spriteTileIndex; }
  get waterSpray() { return this.#properties.waterSpray;}

  setSpriteTileIndex(type: number) { this.#properties.spriteTileIndex = type; }

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

  update(deltaTime: number) {
    const { waterSpray } = this;

    waterSpray.elapsedTime += deltaTime;
    if (waterSpray.elapsedTime >= (1000 / waterSpray.animationSpeed)) {
      waterSpray.currentFrame = (waterSpray.currentFrame + 1) % waterSpray.spriteFrames;
      waterSpray.elapsedTime = 0;
    }
  }

  drawWaterSpray(canvas: CanvasRenderingContext2D, { camOffset, zoomLevel, tileSize }: CamInfo) {
    const { sprite, currentFrame, spriteSize } = this.waterSpray;

    const sx = currentFrame * spriteSize;
    const sy = 0;
    const sWidth = spriteSize;
    const sHeight = spriteSize;
    const dx = this.x * tileSize + (camOffset.x * zoomLevel) - tileSize;
    const dy = this.y * tileSize + (camOffset.y * zoomLevel) - tileSize;
    const dWidth = tileSize * 3;
    const dHeight = tileSize * 3;

    canvas.drawImage(sprite, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }
}
