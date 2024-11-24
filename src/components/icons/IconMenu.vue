<template>
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :aria-label="alt" :aria-hidden="!alt">
    <path d="M4 6H20M4 12H20M4 18H20" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup lang="ts">
import { IconProps } from '@icons/Icon.types';

defineProps<IconProps>();
</script>

<style scoped lang="scss">
svg {
  height: 1em;
}
</style>
