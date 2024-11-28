import type { CamInfo } from '@composables/useRenderer';
import { Entity } from '@lib/entities/_base';

export const updateAnimationHandler = (entity: Entity, deltaTime: number) => {
  entity._elapsedTime += deltaTime;
  if (entity.elapsedTime >= (1000 / entity.animationSpeed)) {
    entity._currentFrame = (entity.currentFrame + 1) % entity.spriteFrames;
    entity._elapsedTime = 0;
  }
};

export const colorBodyHandler = (entity: Entity) => {
  const img = entity.spriteSheet.body;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = entity.color;
    ctx.fillRect(0, 0, img.width, img.height);
    const coloredImage = new Image();
    coloredImage.src = canvas.toDataURL();
    coloredImage.onload = () => {
      entity.spriteSheet.body = coloredImage;
    };
  };
};

export const drawHandler = (entity: Entity, canvas: CanvasRenderingContext2D, {
  zoomLevel,
  camOffset,
  tileSize,
}: CamInfo) => {
  const baseSprite = entity.spriteSheet.base;
  const bodySprite = entity.spriteSheet.body;
  const shadeSprite = entity.spriteSheet.shade;

  const sx = entity.currentFrame * entity.spriteSize;
  const sy = entity.currentAnimation * entity.spriteSize;
  const sWidth = entity.spriteSize;
  const sHeight = entity.spriteSize;
  let dx = entity.x * tileSize + (camOffset.x * zoomLevel) - tileSize;
  const dy = entity.y * tileSize + (camOffset.y * zoomLevel) - tileSize;
  const dWidth = tileSize * 3;
  const dHeight = tileSize * 3;

  if (entity.isWalkingBackwards) {
    canvas.save();
    canvas.scale(-1, 1);
    dx = -dx - dWidth;
  }

  type DrawingOptions = [number, number, number, number, number, number, number, number];
  const drawingOptions: DrawingOptions = [sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight];

  canvas.drawImage(bodySprite, ...drawingOptions);
  canvas.drawImage(baseSprite, ...drawingOptions);
  canvas.drawImage(shadeSprite, ...drawingOptions);

  if (entity.isWalkingBackwards) { canvas.restore(); }
};
