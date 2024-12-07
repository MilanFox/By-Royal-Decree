<template>
  <div class="pane">
    <div class="pane__title">
      {{ title }}
    </div>
    <div class="pane__body">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PaneProps } from '@molecules/Pane/Pane.types.js';

defineProps<PaneProps>();
</script>

<style lang="scss">
.pane {
  display: grid;
  grid-template-rows: 60px 1fr;
  border-image: url('/images/panes/background.png') 64 fill / 64px / 0 round;
  font-family: Enchanted, sans-serif;
  color: $color-text-primary;
  font-size: 36px;
  container-type: inline-size;

  &__title {
    user-select: none;
    align-items: center;
    gap: 8px;
    margin: 13px 35px 0;
    border-bottom: 1px solid $color-text-primary;
  }

  &__body {
    flex-grow: 1;
    margin: 0 36px 36px;
    height: calc(100% - 60px); // Specific Sizes needed for Monaco to be responsive.
    width: calc(100cqw - 36px - 36px); // Specific Sizes needed for Monaco to be responsive.
    overflow: auto;
  }
}
</style>
