<template>
  <div class="game-view">
    <DoublePageLayout title="Live Preview" :tabs="tabs">
      <template #left>
        <GameCanvas class="game-view__game-canvas"/>
      </template>

      <template #right-0>
        {{ intro }}
      </template>

      <template #right-1>
        <CodeEditor ref="codeEditorPawns" :default-code="defaultCode?.pawn ?? ''"/>
      </template>

      <template #right-2>
        <CodeEditor ref="codeEditorKnights" :default-code="defaultCode?.knight ?? ''"/>
      </template>
    </DoublePageLayout>
    <GameControls :buttons="controls" class="game-view__controls"/>
  </div>
</template>

<script setup lang="ts">
import GameCanvas from '@molecules/GameCanvas/GameCanvas.vue';
import useLevel, { levelData } from '@composables/useLevel';
import CodeEditor from '@atoms/CodeEditor/CodeEditor.vue';
import { ref } from 'vue';
import type { IconButtonProps } from '@atoms/IconButton/IconButton.types';
import { useRendererStore } from '@stores/renderer';
import GameControls from '@molecules/GameControls/GameControls.vue';
import useUserLogic from '@composables/useUserLogic';
import DoublePageLayout from '@layouts/DoublePage/DoublePageLayout.vue';
import { useRoute } from 'vue-router';

const { params: { id } } = useRoute();

useLevel().initializeLevel(parseInt(id.toString(), 10));

const { intro, defaultCode } = levelData.currentLevel;

const renderStore = useRendererStore();

const codeEditorPawns = ref();
const codeEditorKnights = ref();

const runProgram = () => {
  codeEditorPawns.value?.saveUserCode('pawn');
  codeEditorKnights.value?.saveUserCode('knight');
  useLevel().initializeLevel(1);
  useUserLogic().runUserCode();
};

const tabs = [
  { text: 'Intro', src: '/images/deco/signpost.png' },
  { text: 'Pawns', src: '/sprites/pawn/_thumb.png' },
  { text: 'Knights', src: '/sprites/knight/_thumb.png' },
];

const controls: IconButtonProps[] = [
  { text: 'Run Code', icon: 'play', onClick: runProgram },
  { text: 'Recenter View', icon: 'vision', onClick: renderStore.recenterView },
];

</script>

<style lang="scss">
.game-view {
  position: relative;

  &__controls {
    position: absolute;
    right: 25px;
    bottom: 65px;

    @include from-breakpoint(tablet) {
      right: 50px;
      bottom: 25px;
    }
  }

  &__game-canvas {
    border: 3px inset $color-panes-body;
  }
}

</style>
