import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserConfigStore = defineStore('userConfig', () => {
  const shouldRenderGrid = ref(true);
  const shouldAnimateSprites = ref(true);

  return { shouldRenderGrid, shouldAnimateSprites };
});
