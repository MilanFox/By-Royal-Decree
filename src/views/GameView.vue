<template>
  <div class="game-view">
    <Pane title="Live Preview" class="game-view__game-canvas">
      <GameCanvas/>
    </Pane>

    <div class="game-view__tabs">
      <div class="game-view__tablist" role="tablist">
        <button
          v-for="({text, src}, i) in tabs"
          :key="text"
          role="tab"
          class="game-view__tab"
          @click="currentTab = i"
          :class="{'game-view__tab--active': currentTab === i}"
          :aria-controls="`game-view__tabpanel-${i}`"
          :aria-current="currentTab === i"
        >
          <img :alt="text" src="/images/ribbon/ribbon_r.png" class="game-view__tab-ribbon">
          <img alt="" :src="src" class="game-view__tab-thumbnail"/>
        </button>
      </div>

      <div class="game-view__tabpanel" role="tabpanel">
        <Pane title="Intro" v-show="currentTab === 0" class="game-view__tabpanel-content" id="game-view__tabpanel-0">
          <div class="game-view__tabpanel-text">{{ intro }}</div>
        </Pane>
        <Pane title="Pawns" v-show="currentTab === 1" class="game-view__tabpanel-content" id="game-view__tabpanel-1">
          <CodeEditor ref="codeEditorPawns" :default-code="defaultCode?.pawn ?? ''"/>
        </Pane>
        <Pane title="Knights" v-show="currentTab === 2" class="game-view__tabpanel-content" id="game-view__tabpanel-2">
          <CodeEditor ref="codeEditorKnights" :default-code="defaultCode?.knight ?? ''"/>
        </Pane>
      </div>

      <GameControls :buttons="controls" class="game-view__controls"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pane from '@molecules/Pane/Pane.vue';
import GameCanvas from '@molecules/GameCanvas/GameCanvas.vue';
import useLevel, { levelData } from '@composables/useLevel';
import CodeEditor from '@atoms/CodeEditor/CodeEditor.vue';
import { ref } from 'vue';
import type { IconButtonProps } from '@atoms/IconButton/IconButton.types';
import { useRendererStore } from '@stores/renderer';
import GameControls from '@molecules/GameControls/GameControls.vue';
import useUserLogic from '@composables/useUserLogic';

useLevel().initializeLevel(1);

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

const currentTab = ref(0);

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
  display: grid;
  gap: 16px;
  isolation: isolate;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr;

  @include from-breakpoint(tablet) {
    width: calc(100% - 100px);
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);
  }

  &__game-canvas {
    @include from-breakpoint(tablet) {
      grid-column: 1 / span 2;
      grid-row: 1;
    }
  }

  &__tabs {
    position: relative;
    isolation: isolate;

    @include from-breakpoint(tablet) {
      grid-column: 2;
      grid-row: 1;
      z-index: 1;
      filter: drop-shadow(-12px 0 12px rgba($color-bg, 0.5));
    }

    @include to-breakpoint(tablet) {
      height: calc(100% - 100px);
    }
  }

  &__tablist {
    position: absolute;
    display: flex;
    z-index: -1;

    @include to-breakpoint(tablet) {
      bottom: 10px;
      left: 20px;
    }

    @include from-breakpoint(tablet) {
      flex-direction: column;
      right: -50px;
      top: 25px;
    }
  }

  &__tab {
    transition: transform 100ms ease-in-out;
    position: relative;

    @include to-breakpoint(tablet) {
      width: 50px;
      transform: rotateZ(90deg);

      &:hover {
        transform: translateY(10px) rotateZ(90deg);
      }

      &--active {
        transform: translateY(30px) rotateZ(90deg) !important;
      }
    }

    @include from-breakpoint(tablet) {
      &:hover {
        transform: translateX(20px);
      }

      &--active {
        transform: translateX(40px) !important;
      }
    }
  }

  &__tab-thumbnail {
    position: absolute;
    height: 35px;

    @include to-breakpoint(tablet) {
      transform: rotateZ(-90deg);
      left: 35px;
      top: 5px;
    }

    @include from-breakpoint(tablet) {
      right: 40px;
    }
  }

  &__tabpanel, &__tabpanel-content {
    height: 100%;
  }

  &__tabpanel-text {
    padding: 24px;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 300;
    background: $color-panes-body;
    color: $color-panes-text-secondary;
    height: 100%;
  }

  &__controls {
    position: absolute;
    right: -50px;
    bottom: 12px;

    @include to-breakpoint(tablet) {
      right: 12px;
      bottom: -50px;
    }
  }
}

</style>
