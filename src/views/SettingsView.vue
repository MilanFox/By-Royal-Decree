<template>
  <DoublePageLayout title="Settings" class="settings-view">
    <template #right-0>
      <ul class="settings-view__setting-list">
        <li v-for="input in inputs" :key="input.label">
          <label>
            <input v-bind="input.options" v-model="input.binding" class="settings-view__input">
            {{ input.label }}
          </label>
        </li>
      </ul>
    </template>
  </DoublePageLayout>
</template>

<script setup lang="ts">
import DoublePageLayout from '@layouts/DoublePage/DoublePageLayout.vue';
import { useUserConfigStore } from '@stores/userConfig';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';

const userConfig = useUserConfigStore();
const { shouldAnimateSprites, shouldRenderGrid, gameSpeed } = storeToRefs(userConfig);

const inputs = reactive([
  { label: 'Show Grid', binding: shouldRenderGrid, options: { type: 'checkbox' } },
  { label: 'Animate Sprites', binding: shouldAnimateSprites, options: { type: 'checkbox' } },
  { label: 'Game Speed', binding: gameSpeed, options: { type: 'range', min: 1, max: 10 } },
]);
</script>

<style lang="scss">
.settings-view {
  &__setting-list {
    list-style: none;
    padding: 0;
  }

  &__input {
    accent-color: $color-panes-text;

    &[type='checkbox'] {
      height: 20px;
      width: 20px;
    }
  }
}
</style>
