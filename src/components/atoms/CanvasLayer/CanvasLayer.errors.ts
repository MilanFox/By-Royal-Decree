import type { CanvasLayerIDs } from '@stores/renderer';

export const canvasLayerError = {
  CTX_NOT_FOUND: (id: CanvasLayerIDs) => {
    return new Error(`Registration of canvas with id '${id}' failed - canvas context not found.`);
  },
};
