import { defineStore } from 'pinia';
import type { Pawn } from '@lib/entities/pawn/pawn.class';
import { reactive } from 'vue';

export const useLogicStore = defineStore('logic', () => {
  const gameLogic = reactive({
    pawn: (pawn: Pawn) => {}, /* eslint-disable-line @typescript-eslint/no-unused-vars */
  });

  return { gameLogic };
});
