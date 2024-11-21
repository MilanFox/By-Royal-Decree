import { CanvasLayerIDs, useRendererStore } from '@stores/renderer';

export default () => {
  const { getCanvasCtx, gameCanvasDimensions, camOffset } = useRendererStore();

  const clearCanvas = (id: CanvasLayerIDs) => {
    getCanvasCtx(id).clearRect(0, 0, gameCanvasDimensions.width, gameCanvasDimensions.height);
  };

  const renderLoop = () => {
    clearCanvas(CanvasLayerIDs.ENTITIES);
    const { zoomLevel } = useRendererStore();

    /* TODO: Temp Sprite */
    getCanvasCtx(CanvasLayerIDs.ENTITIES)
      .fillRect((50 + camOffset.x) * zoomLevel, (50 + camOffset.y) * zoomLevel, 25 * zoomLevel, 25 * zoomLevel);

    requestAnimationFrame(renderLoop);
  };

  return { clearCanvas, renderLoop };
};
