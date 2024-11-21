<template>
  <canvas :id="id" ref="canvasElement" class="canvas-layer"/>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import type { CanvasLayerProps } from './CanvasLayer.types';
import { canvasLayerError } from './CanvasLayer.errors';
import { useRendererStore } from '@stores/renderer';

const props = defineProps<CanvasLayerProps>();

const canvasElement = ref<HTMLCanvasElement>();
const { registerLayer, unregisterLayer, gameCanvasDimensions } = useRendererStore();

const setSize = () => {
  if (!canvasElement.value) return;
  canvasElement.value.width = gameCanvasDimensions.width;
  canvasElement.value.height = gameCanvasDimensions.height;
};

onMounted(async () => {
  const context = canvasElement.value?.getContext('2d');
  if (!context) throw canvasLayerError.CTX_NOT_FOUND(props.id);
  registerLayer(props.id, context);
  await nextTick();
  setSize();
  window.addEventListener('resize', setSize);
});

onBeforeUnmount(() => {
  unregisterLayer(props.id);
  window.removeEventListener('resize', setSize);
});
</script>

<style lang="scss">
.canvas-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
