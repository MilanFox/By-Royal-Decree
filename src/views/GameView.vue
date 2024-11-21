<template>
  <div class="game-view">
    <GameCanvas class="game-view__game-canvas"/>
    <div class="game-view__ide"/>
  </div>
</template>

<script setup lang="ts">
import GameCanvas from '@/components/molecules/GameCanvas.vue';
import useLevel from '@composables/useLevel';

useLevel().initializeLevel();
</script>

<style lang="scss">
.game-view {
  display: grid;
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

  &__ide {
    background: #CCC; /* stylelint-disable-line color-no-hex */
  }
}
</style>
