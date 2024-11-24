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
  display: flex;
  flex-direction: column;
  border: 1px solid $color-panes-border;
  background: $color-panes-bg;
  $pane-border: 5px solid $color-panes-bg;

  &__title {
    user-select: none;
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 5px 5px 0;
  }

  &__body {
    flex-grow: 1;
    margin: 0 5px 5px;
  }
}
</style>
