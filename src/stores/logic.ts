import { defineStore } from 'pinia';
import type { Pawn } from '@lib/entities/pawn/pawn.class';
import { reactive } from 'vue';
import { Knight } from '@lib/entities/knight';

export const useLogicStore = defineStore('logic', () => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const gameLogic = reactive({
    pawn: (pawn: Pawn) => { },
    knight: (knight: Knight) => { },
  });
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return { gameLogic };
});
