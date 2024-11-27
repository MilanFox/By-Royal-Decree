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
  color: $color-panes-text;
  font-size: 36px;
  container-type: inline-size;

  &__title {
    user-select: none;
    padding: 8px 30px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 5px 5px 0;
  }

  &__body {
    flex-grow: 1;
    margin: 0 36px 36px;
    border: 2px solid $color-panes-border;
    box-shadow: 0 0 0 3px $color-panes-shadow;
    height: calc(100% - 60px); // Specific Sizes needed for Monaco to be responsive.
    width: calc(100cqw - 36px - 36px); // Specific Sizes needed for Monaco to be responsive.
  }
}
</style>
