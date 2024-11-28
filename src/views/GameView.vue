<template>
  <div class="game-view">
    <Pane title="Live Preview">
      <GameCanvas class="game-view__pane"/>
    </Pane>
    <GameControls :buttons="controls"/>
    <Pane title="Code">
      <CodeEditor ref="codeEditor"/>
    </Pane>
  </div>
</template>

<script setup lang="ts">
import Pane from '@molecules/Pane/Pane.vue';
import GameCanvas from '@molecules/GameCanvas/GameCanvas.vue';
import useLevel from '@composables/useLevel';
import CodeEditor from '@atoms/CodeEditor/CodeEditor.vue';
import GameControls from '@molecules/GameControls/GameControls.vue';
import { ref } from 'vue';
import type { IconButtonProps } from '@atoms/IconButton/IconButton.types';
import { useRendererStore } from '@stores/renderer';

useLevel().initializeLevel(1);

const renderStore = useRendererStore();
const codeEditor = ref();

const controls: IconButtonProps[] = [
  { text: 'Run Code', icon: 'play', onClick: () => codeEditor?.value.runUserCode() },
  { text: 'Recenter View', icon: 'vision', onClick: () => renderStore.recenterView() },
];
</script>

<style lang="scss">
.game-view {
  display: grid;
  gap: 16px;
  grid-template-rows:  1fr min-content 1fr;
  grid-template-columns: 1fr;

  @include from-breakpoint(tablet) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr min-content 1fr;
  }

  &__game-canvas {
    width: 100%;
    height: 100%;
  }
}

</style>
