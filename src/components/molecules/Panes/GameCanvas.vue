<template>
  <div class="game-canvas">
    <div class="pane__title">
      <GamepadIcon title=""/>
      <h2>Live Preview</h2>
    </div>
    <div class="game-canvas__canvas pane__body" ref="gameCanvas">
      <CanvasLayer v-for="id in canvasLayers" :id="id" :key="id" aria-hidden="true"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRendererStore } from '@stores/renderer';
import useRenderer from '@composables/useRenderer';
import { useMouseInElement } from '@vueuse/core';
import CanvasLayer from '@atoms/CanvasLayer/CanvasLayer.vue';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import GamepadIcon from 'vue3-material-design-icons-ts/dist/GamepadVariantOutline.vue';

const { canvasLayers, gameCanvasDimensions, zoomOut, zoomIn, camOffset } = useRendererStore();
const { renderLoop } = useRenderer();

const gameCanvas = ref<HTMLDivElement>();
const { isOutside } = useMouseInElement(gameCanvas);

const updateDimensions = () => {
  gameCanvasDimensions.width = gameCanvas.value?.clientWidth ?? 0;
  gameCanvasDimensions.height = gameCanvas.value?.clientHeight ?? 0;
};

// Zoom

const handleZoom = (event: WheelEvent) => {
  if (isOutside.value) return;
  event.preventDefault();
  if (event.deltaY > 0) zoomOut(); else zoomIn();
};

// Cam Move

const startOffset = reactive({ x: 0, y: 0 });
const dragStart = reactive(({ x: 0, y: 0 }));

const handleDrag = (event: MouseEvent | TouchEvent) => {
  event.preventDefault();
  const { zoomLevel } = useRendererStore();
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

  camOffset.x = startOffset.x + ((clientX - dragStart.x) / zoomLevel);
  camOffset.y = startOffset.y + ((clientY - dragStart.y) / zoomLevel);
};

const handleDragStart = (event: MouseEvent | TouchEvent) => {
  if (isOutside.value || ('button' in event && event.button !== 0)) return;
  startOffset.x = camOffset.x;
  startOffset.y = camOffset.y;

  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

  dragStart.x = clientX;
  dragStart.y = clientY;

  if ('touches' in event) {
    window.addEventListener('touchmove', handleDrag, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
  } else {
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
  }
};

const handleDragEnd = () => {
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('mouseup', handleDragEnd);
  window.removeEventListener('touchmove', handleDrag);
  window.removeEventListener('touchend', handleDragEnd);
};

// Setup

onMounted(async () => {
  window.addEventListener('resize', updateDimensions);
  document.addEventListener('wheel', handleZoom, { passive: false });
  document.addEventListener('mousedown', handleDragStart);
  document.addEventListener('touchstart', handleDragStart);
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchend', handleDragEnd);

  updateDimensions();
  renderLoop();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDimensions);
  document.removeEventListener('wheel', handleZoom);
  document.removeEventListener('mousedown', handleDragStart);
  document.removeEventListener('mouseup', handleDragEnd);
});
</script>

<style lang="scss">
.game-canvas {
  &__canvas {
    position: relative;
  }
}
</style>
