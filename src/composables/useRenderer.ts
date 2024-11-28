import { CanvasLayerIDs, useRendererStore } from '@stores/renderer';
import { levelData } from '@composables/useLevel';
import { useUserConfigStore } from '@stores/userConfig';

export interface CamInfo {
  zoomLevel: number;
  camOffset: { x: number, y: number };
  tileSize: number;
}

export default () => {
  const userConfig = useUserConfigStore();

  const { getCanvasCtx, gameCanvasDimensions } = useRendererStore();

  let lastPaint = performance.now();

  const clearCanvas = (id: CanvasLayerIDs) => {
    getCanvasCtx(id).clearRect(0, 0, gameCanvasDimensions.width, gameCanvasDimensions.height);
  };

  const drawGrid = ({ camOffset, zoomLevel }: CamInfo) => {
    clearCanvas(CanvasLayerIDs.GRID);

    if (!userConfig.shouldRenderGrid) return;

    const ctx = getCanvasCtx(CanvasLayerIDs.GRID);
    const { width, height } = gameCanvasDimensions;
    const { tileSize } = useRendererStore();

    ctx.strokeStyle = '#666666';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;

    const startX = (camOffset.x * zoomLevel) % tileSize;
    const startY = (camOffset.y * zoomLevel) % tileSize;

    for (let x = startX; x < width; x += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = startY; y < height; y += tileSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawEntities = (camInfo: CamInfo) => {
    clearCanvas(CanvasLayerIDs.ENTITIES);
    const currentTime = performance.now();

    levelData.currentLevel.allEntities
      .sort((a, b) => b.x - a.x || a.y - b.y)
      .forEach(pawn => {
        if (userConfig.shouldAnimateSprites) pawn.updateAnimation(currentTime - lastPaint);
        pawn.draw(getCanvasCtx(CanvasLayerIDs.ENTITIES), camInfo);
      });

    lastPaint = currentTime;
  };

  const drawTerrain = (camInfo: CamInfo) => {
    clearCanvas(CanvasLayerIDs.TERRAIN);
    levelData.currentLevel.flatMap.forEach(tile => tile.draw(getCanvasCtx(CanvasLayerIDs.TERRAIN), camInfo));
  };

  const drawWater = () => {
    const bg = getCanvasCtx(CanvasLayerIDs.BACKGROUND);
    bg.fillStyle = '#47aba9';
    bg.fillRect(0, 0, gameCanvasDimensions.width, gameCanvasDimensions.height);
  };

  const drawWaterSpray = (camInfo: CamInfo) => {
    const ctx = getCanvasCtx(CanvasLayerIDs.WATER_SPRAY);
    clearCanvas(CanvasLayerIDs.WATER_SPRAY);
    const currentTime = performance.now();
    levelData.currentLevel.waterTouchingTiles.forEach(tile => {
      if (userConfig.shouldAnimateSprites) tile.update(currentTime - lastPaint);
      tile.drawWaterSpray(ctx, camInfo);
    });
  };

  const renderLoop = () => {
    const { camOffset, zoomLevel, tileSize } = useRendererStore();
    const camInfo: CamInfo = { zoomLevel, camOffset, tileSize };

    drawWater();
    drawWaterSpray(camInfo);
    drawTerrain(camInfo);
    drawGrid(camInfo);
    drawEntities(camInfo);

    requestAnimationFrame(renderLoop);
  };

  return { clearCanvas, renderLoop };
};
