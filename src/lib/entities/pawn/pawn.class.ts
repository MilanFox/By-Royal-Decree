import { Entity } from '../entitiy.class';
import type { CamInfo } from '@composables/useRenderer';
import type { PawnConstructorOptions, PawnProperties } from '@lib/entities/pawn/pawn.types';
import type { Color } from '@lib/types';
import { pawnColors } from '@lib/entities/pawn/pawn.const';

export class Pawn extends Entity {
  constructor({ entityOptions = {}, pawnOptions = {} }: PawnConstructorOptions) {
    super(entityOptions);
    this.#pawnProperties = { ...this.#pawnProperties, ...pawnOptions };

    this.#pawnProperties.spriteSheet.base.src = '/sprites/pawn/base.png';
    this.#pawnProperties.spriteSheet.body.src = '/sprites/pawn/body.png';
    this.#applyColorOverlay(this.color);
    this.#pawnProperties.spriteSheet.shade.src = '/sprites/pawn/shade.png';
  }

  #pawnProperties: PawnProperties = {
    color: pawnColors.WHITE,
    spriteSheet: { base: new Image(), body: new Image(), shade: new Image() },
    spriteSize: 192,
    spriteFrames: 6,
    currentFrame: 0,
    elapsedTime: 0,
    animationSpeed: 10,
    currentAnimation: 0,
  };

  get color() {
    return this.#pawnProperties.color;
  }

  get spriteSize() {
    return this.#pawnProperties.spriteSize;
  }

  get currentFrame() {
    return this.#pawnProperties.currentFrame;
  }

  get animationSpeed() {
    return this.#pawnProperties.animationSpeed;
  }

  get currentAnimation() {
    return this.#pawnProperties.currentAnimation;
  }

  update(deltaTime: number) {
    this.#pawnProperties.elapsedTime += deltaTime;

    if (this.#pawnProperties.elapsedTime >= (1000 / this.animationSpeed)) {
      this.#pawnProperties.currentFrame = (this.#pawnProperties.currentFrame + 1) % this.#pawnProperties.spriteFrames;
      this.#pawnProperties.elapsedTime = 0;
    }
  }

  #applyColorOverlay(color: Color) {
    const img = this.#pawnProperties.spriteSheet.body;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, img.width, img.height);
      const coloredImage = new Image();
      coloredImage.src = canvas.toDataURL();
      coloredImage.onload = () => {
        this.#pawnProperties.spriteSheet.body = coloredImage;
      };
    };
  }

  draw(canvas: CanvasRenderingContext2D, { zoomLevel, camOffset, tileSize }: CamInfo) {
    const baseSprite = this.#pawnProperties.spriteSheet.base;
    const bodySprite = this.#pawnProperties.spriteSheet.body;
    const shadeSprite = this.#pawnProperties.spriteSheet.shade;

    const sx = this.currentFrame * this.spriteSize;
    const sy = this.currentAnimation * this.spriteSize;
    const sWidth = this.spriteSize;
    const sHeight = this.spriteSize;
    const dx = this.x * tileSize + (camOffset.x * zoomLevel) - tileSize;
    const dy = this.y * tileSize + (camOffset.y * zoomLevel) - tileSize;
    const dWidth = tileSize * 3;
    const dHeight = tileSize * 3;

    type DrawingOptions = [number, number, number, number, number, number, number, number];
    const drawingOptions: DrawingOptions = [sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight];

    canvas.drawImage(bodySprite, ...drawingOptions);
    canvas.drawImage(baseSprite, ...drawingOptions);
    canvas.drawImage(shadeSprite, ...drawingOptions);
  }
}
