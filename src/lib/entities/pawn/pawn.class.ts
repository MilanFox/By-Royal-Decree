import type { CamInfo } from '@composables/useRenderer';
import type { PawnConstructorOptions, PawnProperties } from '@lib/entities/pawn/pawn.types';
import type { Color } from '@lib/types';
import { directions, pawnColors } from '@lib/entities/pawn/pawn.const';
import { pawnError } from '@lib/entities/pawn/pawn.errors';
import type { Direction } from '@lib/level/level.types';
import { Level } from '@lib/level/level.class';

export class Pawn {
  constructor(options: PawnConstructorOptions, level: Level) {
    this.#properties = { ...this.#properties, ...options };

    this.#properties.spriteSheet.base.src = '/sprites/pawn/base.png';
    this.#properties.spriteSheet.body.src = '/sprites/pawn/body.png';
    this.#properties.spriteSheet.shade.src = '/sprites/pawn/shade.png';
    this.#applyColorOverlay(this.color);

    this.#level = level;

    this.#properties.blockedPosition.x = this.x;
    this.#properties.blockedPosition.y = this.y;
  }

  readonly #properties: PawnProperties = {
    color: pawnColors.WHITE,
    spriteSheet: { base: new Image(), body: new Image(), shade: new Image() },
    spriteSize: 192,
    spriteFrames: 6,
    currentFrame: 0,
    elapsedTime: 0,
    animationSpeed: 10,
    currentAnimation: 0,
    x: 0,
    y: 0,
    speed: 2,
    blockedPosition: { x: 0, y: 0 },
  };

  readonly #level: Level;

  /* --- --- --- --- --- PAWN STATE --- --- --- --- --- */

  #isBusy = false;
  #isDrowning = false;
  #isFinished = false;
  #isWalkingBackwards = false;

  /* --- --- --- --- --- PUBLIC GETTERS --- --- --- --- --- */

  get color() { return this.#properties.color; }
  get spriteSize() { return this.#properties.spriteSize; }
  get currentFrame() { return this.#properties.currentFrame; }
  get animationSpeed() { return this.#properties.animationSpeed; }
  get currentAnimation() { return this.#properties.currentAnimation; }
  get x() { return this.#properties.x; }
  get y() { return this.#properties.y; }
  get speed() { return this.#properties.speed; }
  get isBusy() { return this.#isBusy; }
  get isDrowning() { return this.#isDrowning; }
  get isFinished() { return this.#isFinished; }
  get isWalkingBackwards() { return this.#isWalkingBackwards; }
  get blockedPosition() { return { ...this.#properties.blockedPosition }; }

  /* --- --- --- --- --- RENDERER API --- --- --- --- --- */

  update(deltaTime: number) {
    this.#properties.elapsedTime += deltaTime;
    if (this.#properties.elapsedTime >= (1000 / this.animationSpeed)) {
      this.#properties.currentFrame = (this.#properties.currentFrame + 1) % this.#properties.spriteFrames;
      this.#properties.elapsedTime = 0;
    }
  }

  #applyColorOverlay(color: Color) {
    const img = this.#properties.spriteSheet.body;
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
        this.#properties.spriteSheet.body = coloredImage;
      };
    };
  }

  draw(canvas: CanvasRenderingContext2D, { zoomLevel, camOffset, tileSize }: CamInfo) {
    const baseSprite = this.#properties.spriteSheet.base;
    const bodySprite = this.#properties.spriteSheet.body;
    const shadeSprite = this.#properties.spriteSheet.shade;

    const sx = this.currentFrame * this.spriteSize;
    const sy = this.currentAnimation * this.spriteSize;
    const sWidth = this.spriteSize;
    const sHeight = this.spriteSize;
    let dx = this.x * tileSize + (camOffset.x * zoomLevel) - tileSize;
    const dy = this.y * tileSize + (camOffset.y * zoomLevel) - tileSize;
    const dWidth = tileSize * 3;
    const dHeight = tileSize * 3;

    if (this.isWalkingBackwards) {
      canvas.save();
      canvas.scale(-1, 1);
      dx = -dx - dWidth;
    }

    type DrawingOptions = [number, number, number, number, number, number, number, number];
    const drawingOptions: DrawingOptions = [sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight];

    canvas.drawImage(bodySprite, ...drawingOptions);
    canvas.drawImage(baseSprite, ...drawingOptions);
    canvas.drawImage(shadeSprite, ...drawingOptions);

    if (this.isWalkingBackwards) { canvas.restore(); }
  }

  /* --- --- --- --- --- USER API --- --- --- --- --- */

  endRoutine() { this.#isFinished = true; }

  async walk(dir: Direction) {
    if (this.isFinished || this.isDrowning) return;
    if (!['up', 'right', 'down', 'left'].includes(dir)) throw pawnError.UNKNOWN_DIR(dir);
    if (this.isBusy) throw pawnError.IS_BUSY();

    this.#isBusy = true;
    this.#properties.currentAnimation = 1;

    const { x, y } = directions[dir];
    if (x < 0) this.#isWalkingBackwards = true;
    if (x > 0) this.#isWalkingBackwards = false;

    const steps = Math.round(100 / this.speed);

    const walkingAnimation = async () => {
      for (let i = 0; i < steps; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000 / (this.speed * steps)));
        this.#properties.x += x / steps;
        this.#properties.y += y / steps;
      }
    };

    while (true) {
      const retryDelay = 1000 / this.speed;
      const target = { x: this.x + x, y: this.y + y };
      const isTargetBlocked = this.#level.allEntities
        .some(entity => entity.blockedPosition.x === target.x && entity.blockedPosition.y === target.y);

      if (!isTargetBlocked) {
        this.#properties.blockedPosition = target;
        await walkingAnimation();
        break;
      }

      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }

    /* Flatten out potential floating point errors */
    this.#properties.x = Math.round(this.x);
    this.#properties.y = Math.round(this.y);

    this.#isBusy = false;
    this.#properties.currentAnimation = 0;

    const currentTileIsLand = Boolean(this.#level.map[this.y]?.[this.x]);
    if (!currentTileIsLand) {
      this.#isDrowning = true;
      this.#properties.currentAnimation = 6;
    }
  }
}
