<template>
  <div class="game-view">
    <Pane title="Live Preview">
      <GameCanvas class="game-view__pane"/>
    </Pane>
    <Pane title="Code">

    </Pane>
  </div>
</template>

<script setup lang="ts">
import Pane from '@molecules/Pane/Pane.vue';
import GameCanvas from '@molecules/GameCanvas/GameCanvas.vue';
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

</style>
