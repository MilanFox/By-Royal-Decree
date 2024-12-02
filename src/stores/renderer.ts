import { defineStore } from 'pinia';
import type { Reactive } from 'vue';
import { computed, reactive, ref } from 'vue';
import type { LevelMapBlueprint } from '@lib/level/level.types';

export enum CanvasLayerIDs {
  BACKGROUND = 'canvas-background',
  WATER_SPRAY = 'canvas-water-spray',
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
  const zoomMin = 0.5;
  const zoomStep = 0.25;
  const zoomLevel = ref(1);
  const zoomIn = () => zoomLevel.value = Math.min(zoomMax, zoomLevel.value + zoomStep);
  const zoomOut = () => zoomLevel.value = Math.max(zoomMin, zoomLevel.value - zoomStep);

  const baseTileSize = ref(48);
  const tileSize = computed(() => baseTileSize.value * zoomLevel.value);
  const camOffset = reactive({ x: baseTileSize.value / 2, y: baseTileSize.value / 2 });
  const gameCanvasDimensions = reactive({ width: 0, height: 0 });

  const recenterView = (map: LevelMapBlueprint) => {
    zoomLevel.value = 1;
    const mapWidth = Math.max(...map.map(row => row.length));
    const mapHeight = map.length;
    const mapPixelWidth = mapWidth * tileSize.value;
    const mapPixelHeight = mapHeight * tileSize.value;
    if (mapPixelWidth <= gameCanvasDimensions.width && mapPixelHeight <= gameCanvasDimensions.height) {
      camOffset.x = (gameCanvasDimensions.width - mapPixelWidth) / 2;
      camOffset.y = (gameCanvasDimensions.height - mapPixelHeight) / 2;
    } else {
      camOffset.x = baseTileSize.value / 2;
      camOffset.y = baseTileSize.value / 2;
    }
  };

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
    recenterView,
  };
});
