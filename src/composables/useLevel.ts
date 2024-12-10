import levels from '@levels/index';
import { Level } from '@lib/level/level.class';
import { useStatusMessageStore } from '@stores/statusMessage';

const { clearGameStatus } = useStatusMessageStore();

export const levelData = {
  currentLevel: new Level({
    title: '',
    intro: '',
    blueprint: [[]],
    entities: { pawns: [] },
    validator: (level) => Boolean(level),
  }),
};

export default () => {
  const initializeLevel = async (levelID: number) => {
    clearGameStatus();
    const index = levelID - 1;
    if (!levels || !levels[index]) throw new Error(`Level with id "${index}" does not exist.`);
    levelData.currentLevel = new Level(levels[index]);
  };

  return { initializeLevel };
};
