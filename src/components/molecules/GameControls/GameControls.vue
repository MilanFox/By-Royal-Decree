<template>
  <div class="game-controls">
    <IconButton v-for="button in buttons" :key="button.text" v-bind="button"/>
  </div>
</template>

<script setup lang="ts">
import IconButton from '@atoms/IconButton/IconButton.vue';
import type { GameControlProps } from '@molecules/GameControls/GameControls.types';

defineProps<GameControlProps>();
</script>

<style lang="scss">
.game-controls {
  display: flex;
  gap: 16px;

  @include from-breakpoint(tablet) {
    flex-direction: column;
    padding-top: 12px;
  }
}
</style>
