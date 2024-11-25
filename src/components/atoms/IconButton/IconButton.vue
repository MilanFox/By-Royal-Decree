<template>
  <button class="icon-button">
    <img :src="`/icons/${icon}.png`" :alt="alt">
  </button>
</template>

<script setup lang="ts">
import type { IconButtonProps } from '@atoms/IconButton/IconButton.types';

defineProps<IconButtonProps>();
</script>

<style lang="scss">
.icon-button {
  width: 64px;
  aspect-ratio: 1;
  background-image: url('/images/button/button_blue.png');
  background-repeat: no-repeat;
  display: grid;
  place-items: center;
  padding-bottom: 12px;

  img {
    height: 50%;
    width: 50%;
    transform: translateY(-1px);
  }

  &:active {
    background-image: url('/images/button/button_blue_pressed.png');

    img {
      transform: translateY(3px);
    }
  }
}
</style>
