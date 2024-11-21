import { defineStore } from 'pinia';
import type { Reactive } from 'vue';
import { computed, reactive, ref } from 'vue';

export enum CanvasLayerIDs {
  BACKGROUND = 'canvas-background',
  TERRAIN = 'canvas-terrain',
  GRID = 'canvas-grid',
  ENTITIES = 'canvas-entities',
}

export const useRendererStore = defineStore('renderer', () => {
  const canvasLayers = Object.values(CanvasLayerIDs) as CanvasLayerIDs[];

  const canvasCtx = reactive({}) as Reactive<Record<CanvasLayerIDs, CanvasRenderingContext2D>>;
  const getCanvasCtx = (id: CanvasLayerIDs) => canvasCtx[id];
  const registerLayer = (id: CanvasLayerIDs, context: CanvasRenderingContext2D) => canvasCtx[id] = context;
  const unregisterLayer = (id: CanvasLayerIDs) => delete canvasCtx[id];

  const zoomMax = 2;
  const zoomMin = 1;
  const zoomStep = 0.25;
  const zoomLevel = ref(1);
  const zoomIn = () => zoomLevel.value = Math.min(zoomMax, zoomLevel.value + zoomStep);
  const zoomOut = () => zoomLevel.value = Math.max(zoomMin, zoomLevel.value - zoomStep);

  const camOffset = reactive({ x: 0, y: 0 });

  const baseTileSize = ref(48);
  const tileSize = computed(() => baseTileSize.value * zoomLevel.value);

  const gameCanvasDimensions = reactive({ width: 0, height: 0 });

  return {
    canvasLayers,
    tileSize,
    getCanvasCtx,
    registerLayer,
    unregisterLayer,
    gameCanvasDimensions,
    zoomOut,
    zoomIn,
    zoomLevel,
    camOffset,
  };
});
