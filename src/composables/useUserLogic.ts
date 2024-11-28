import { useLogicStore } from '@stores/logic';
import { levelData } from '@composables/useLevel';

export default () => {
  const logicStore = useLogicStore();
  const { pawns, knights } = levelData.currentLevel.entities;
  const { pawn: applyPawnLogic, knight: applyKnightLogic } = logicStore.gameLogic;

  const runUserCode = () => {
    pawns?.forEach(pawn => applyPawnLogic(pawn));
    knights?.forEach(knight => applyKnightLogic(knight));
  };

  return { runUserCode };
};
