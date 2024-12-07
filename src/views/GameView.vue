<template>
  <div class="game-view">
    <DoublePageLayout title="Live Preview" :tabs="tabs">
      <template #left>
        <div class="game-view__preview">
          <GameCanvas class="game-view__game-canvas"/>
        </div>
      </template>

      <template #right-0>
        <div class="game-view__game-controls">
          <TextButton @click="() => useLevel().initializeLevel(levelID)"> Reset Level</TextButton>
          <TextButton @click="runProgram"> Run Code</TextButton>
          <TextButton @click="handInLevel"> Validate Solution</TextButton>
        </div>
        <hr aria-hidden="true">
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
import { ref } from 'vue';
import useUserLogic from '@composables/useUserLogic';
import DoublePageLayout from '@layouts/DoublePage/DoublePageLayout.vue';
import { useRoute } from 'vue-router';
import useConfetti from '@composables/useConfetti';
import TextButton from '@atoms/TextButton/TextButton.vue';

const { params: { id } } = useRoute();
const levelID = parseInt(id.toString(), 10);

useLevel().initializeLevel(levelID);

const { intro, defaultCode, entities, validate } = levelData.currentLevel;

const codeEditorPawns = ref();
const codeEditorKnights = ref();

const runProgram = () => {
  codeEditorPawns.value?.saveUserCode('pawn');
  codeEditorKnights.value?.saveUserCode('knight');
  useLevel().initializeLevel(levelID);
  useUserLogic().runUserCode();
};

const tabs = [
  { text: 'Intro', src: '/images/deco/signpost.png' },
];

if (entities.pawns?.length) tabs.push({ text: 'Pawns', src: '/sprites/pawn/_thumb.png' });
if (entities.knights?.length) tabs.push({ text: 'Knights', src: '/sprites/knight/_thumb.png' });

const levelIsSolved = ref<boolean>(false);
const { spawnConfetti } = useConfetti();

const handInLevel = () => {
  const isValid = validate(levelData.currentLevel);
  if (!isValid) {
    levelIsSolved.value = false;
    return;
  }
  levelIsSolved.value = true;
  spawnConfetti();
};
</script>

<style lang="scss">
.game-view {
  hr {
    border-color: $color-borders;
  }

  &__preview {
    position: relative;
    height: 100%;
  }

  &__game-canvas {
    border: 3px inset $color-borders;
  }

  &__game-controls {
    margin-top: 6px;
  }
}

</style>
