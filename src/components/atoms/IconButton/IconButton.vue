<template>
  <button class="icon-button" @click="onClick" :title="text">
    <img :src="`/buttons/${icon}.png`" :alt="text">
  </button>
</template>

<script setup lang="ts">
import type { IconButtonProps } from '@atoms/IconButton/IconButton.types';

defineProps<IconButtonProps>();
</script>

<style lang="scss">
.icon-button {
  height: 40px;

  img {
    height: 100%;
    aspect-ratio: 1;
  }
}
</style>
