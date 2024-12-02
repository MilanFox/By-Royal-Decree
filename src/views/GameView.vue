<template>
  <div class="game-view">
    <DoublePageLayout title="Live Preview" :tabs="tabs">
      <template #left>
        <div class="game-view__preview">
          <GameCanvas class="game-view__game-canvas"/>
          <GameControls :buttons="controls" class="game-view__controls"/>
        </div>
      </template>

      <template #right-0>
        <p>{{ intro }}</p>
      </template>

      <template #right-1 v-if="entities.pawns?.length">
        <CodeEditor ref="codeEditorPawns" :default-code="defaultCode?.pawn ?? ''"/>
      </template>

      <template #right-2 v-if="entities.knights?.length">
        <CodeEditor ref="codeEditorKnights" :default-code="defaultCode?.knight ?? ''"/>
      </template>
    </DoublePageLayout>

  </div>
</template>

<script setup lang="ts">
import GameCanvas from '@molecules/GameCanvas/GameCanvas.vue';
import useLevel, { levelData } from '@composables/useLevel';
import CodeEditor from '@atoms/CodeEditor/CodeEditor.vue';
import { onMounted, ref } from 'vue';
import type { IconButtonProps } from '@atoms/IconButton/IconButton.types';
import { useRendererStore } from '@stores/renderer';
import GameControls from '@molecules/GameControls/GameControls.vue';
import useUserLogic from '@composables/useUserLogic';
import DoublePageLayout from '@layouts/DoublePage/DoublePageLayout.vue';
import { useRoute } from 'vue-router';
import levels from '@/levels';

const { params: { id } } = useRoute();
const levelID = parseInt(id.toString(), 10);

useLevel().initializeLevel(levelID);

const { intro, defaultCode, entities } = levelData.currentLevel;

const renderStore = useRendererStore();

const codeEditorPawns = ref();
const codeEditorKnights = ref();

const runProgram = () => {
  codeEditorPawns.value?.saveUserCode('pawn');
  codeEditorKnights.value?.saveUserCode('knight');
  useLevel().initializeLevel(levelID);
  useUserLogic().runUserCode();
};

const tryCenterView = () => renderStore.recenterView(levels[levelID - 1].blueprint);

const tabs = [
  { text: 'Intro', src: '/images/deco/signpost.png' },
];

if (entities.pawns?.length) tabs.push({ text: 'Pawns', src: '/sprites/pawn/_thumb.png' });
if (entities.knights?.length) tabs.push({ text: 'Knights', src: '/sprites/knight/_thumb.png' });

const controls: IconButtonProps[] = [
  { text: 'Run Code', icon: 'play', onClick: runProgram },
  { text: 'Reset', icon: 'reset', onClick: () => useLevel().initializeLevel(levelID) },
  { text: 'Validate', icon: 'validate', onClick: () => { /* TODO */ } },
  { text: 'Zoom In', icon: 'zoom-in', onClick: renderStore.zoomIn },
  { text: 'Zoom Out', icon: 'zoom-out', onClick: renderStore.zoomOut },
  { text: 'Recenter View', icon: 'center-view', onClick: tryCenterView },
];

onMounted(tryCenterView);
</script>

<style lang="scss">
.game-view {
  &__preview {
    position: relative;
    height: 100%;
  }

  &__game-canvas {
    border: 3px inset $color-panes-body;
  }

  &__controls {
    position: absolute;
    left: 8px;
    bottom: 8px;

    @include from-breakpoint(tablet) {
      left: unset;
      right: 8px;
      flex-direction: column;
    }
  }
}

</style>
