<template>
  <div class="game-controls">
    <IconButton icon="backward" alt="Run Program" @click="onPressRun" class="game-controls__button-play"/>
  </div>
</template>

<script setup lang="ts">
import IconButton from '@atoms/IconButton/IconButton.vue';
import type { GameControlProps } from '@molecules/GameControls/GameControls.types';

defineProps<GameControlProps>();
</script>

<style lang="scss">
.game-controls {
  display: grid;
  place-items: center;

  &__button-play {
    img {
      transform: translateY(-1px) rotateZ(90deg);

      @include from-breakpoint(tablet) {
        transform: translateY(-1px) rotateZ(0);
      }
    }

    &:active {
      img {
        transform: translateY(3px) rotateZ(90deg);

        @include from-breakpoint(tablet) {
          transform: translateY(3px) rotateZ(0);
        }
      }
    }
  }
}
</style>
