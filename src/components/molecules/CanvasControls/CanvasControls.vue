<template>
  <div class="canvas-controls">
    <IconButton v-for="button in buttons" :key="button.text" v-bind="button"/>
  </div>
</template>

<script setup lang="ts">
import type { IconButtonProps } from '@atoms/IconButton/IconButton.types';
import { useRendererStore } from '@stores/renderer';
import levels from '@/levels';
import { nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import IconButton from '@atoms/IconButton/IconButton.vue';

const { params: { id } } = useRoute();
const levelID = parseInt(id.toString(), 10);

const renderStore = useRendererStore();
const tryCenterView = async () => {
  await nextTick();
  renderStore.recenterView(levels[levelID - 1].blueprint);
};

const buttons: IconButtonProps[] = [
  { text: 'Zoom In', icon: 'zoom-in', onClick: renderStore.zoomIn },
  { text: 'Zoom Out', icon: 'zoom-out', onClick: renderStore.zoomOut },
  { text: 'Recenter View', icon: 'center-view', onClick: tryCenterView },
];

onMounted(tryCenterView);
</script>

<style lang="scss">
.canvas-controls {
  position: absolute;
  left: 8px;
  bottom: 8px;
  display: flex;
  gap: 8px;

  @include from-breakpoint(tablet) {
    left: unset;
    right: 8px;
    flex-direction: column;

  }
}
</style>
