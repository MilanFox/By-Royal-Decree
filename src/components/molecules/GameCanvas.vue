<template>
  <div ref="gameCanvas" class="game-canvas">
    <CanvasLayer v-for="id in canvasLayers" :id="id" :key="id"/>
  </div>
</template>

<script setup lang="ts">
import { useRendererStore } from '@stores/renderer';
import useRenderer from '@composables/useRenderer';
import { useMouseInElement } from '@vueuse/core';
import CanvasLayer from '@atoms/CanvasLayer/CanvasLayer.vue';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';

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
  position: relative;

  &--checkered {
    $checker-color: #EEE; /* stylelint-disable-line color-no-hex */
    $checker-size: 30px;

    background-image: linear-gradient(45deg, $checker-color 25%, transparent 25%),
    linear-gradient(-45deg, $checker-color 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, $checker-color 75%),
    linear-gradient(-45deg, transparent 75%, $checker-color 75%);
    background-position: 0 0,
    0 calc($checker-size / 2),
    calc($checker-size / 2) calc(-1 * $checker-size / 2),
    calc(-1 * $checker-size / 2) 0;
    background-size: $checker-size $checker-size;
  }

  &--labeled {
    border: 3px solid #42b883; /* stylelint-disable-line color-no-hex */

    &::after {
      content: "GameCanvas.vue";
      background: #42b883; /* stylelint-disable-line color-no-hex */
      padding: 5px 10px 5px 15px;
      border-bottom-left-radius: 20px;
      color: #FFF; /* stylelint-disable-line color-no-hex */
      font-family: sans-serif;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
