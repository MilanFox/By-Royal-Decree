import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useUserConfigStore = defineStore('userConfig', () => {
  const shouldRenderGrid = useLocalStorage('userSetting.shouldRenderGrid', false);
  const shouldAnimateSprites = useLocalStorage('userSetting.shouldAnimateSprites', true);

  return { shouldRenderGrid, shouldAnimateSprites };
});
