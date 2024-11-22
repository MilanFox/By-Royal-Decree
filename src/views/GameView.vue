<template>
  <div class="game-view">
    <GameCanvas class="game-view__game-canvas pane"/>
    <IDE class="game-view__ide pane"/>
  </div>
</template>

<script setup lang="ts">
import GameCanvas from '@molecules/Panes/GameCanvas.vue';
import IDE from '@molecules/Panes/IDE.vue';
import useLevel from '@composables/useLevel';

useLevel().initializeLevel(1);
</script>

<style lang="scss">
.game-view {
  display: grid;
  gap: 16px;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;

  @include from-breakpoint(tablet) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }

  &__game-canvas {
    width: 100%;
    height: 100%;
  }
}

.pane {
  display: flex;
  flex-direction: column;
  border: 1px solid $color-panes-border;
  background: $color-panes-bg;
  $pane-border: 5px solid $color-panes-bg;

  &__title {
    user-select: none;
    padding: 4px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
  }

  &__body {
    flex-grow: 1;
    margin: 0 5px 5px;
  }
}
</style>
