<template>
  <DoublePageLayout title="Settings" class="settings-view">
    <template #right-0>
      <ul class="settings-view__setting-list">
        <li v-for="setting in settings" :key="setting.label">
          <label><input type="checkbox" v-model="setting.binding" class="settings-view__checkbox"> {{ setting.label }}
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
const { shouldAnimateSprites, shouldRenderGrid } = storeToRefs(userConfig);

const settings = reactive([
  { label: 'Show Grid', binding: shouldRenderGrid },
  { label: 'Animate Sprites', binding: shouldAnimateSprites },
]);
</script>

<style lang="scss">
.settings-view {
  &__setting-list {
    list-style: none;
    padding: 0;
  }

  &__checkbox {
    accent-color: $color-panes-text;
    height: 20px;
    width: 20px;
  }
}
</style>
