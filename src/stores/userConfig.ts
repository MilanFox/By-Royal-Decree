import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useUserConfigStore = defineStore('userConfig', () => {
  const shouldRenderGrid = useLocalStorage('userSetting.shouldRenderGrid', false);
  const shouldAnimateSprites = useLocalStorage('userSetting.shouldAnimateSprites', true);
  const gameSpeed = useLocalStorage('userSetting.gameSpeed', 2);

  return { shouldRenderGrid, shouldAnimateSprites, gameSpeed };
});
