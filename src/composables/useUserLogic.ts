import { useLogicStore } from '@stores/logic';
import { levelData } from '@composables/useLevel';

export default () => {
  const logicStore = useLogicStore();
  const { pawns } = levelData.currentLevel.entities;
  const { pawn: applyPawnLogic } = logicStore.gameLogic;

  const runUserCode = () => {
    pawns.forEach(pawn => applyPawnLogic(pawn));
  };

  return { runUserCode };
};
