import levels from '@levels/index';
import { Level } from '@lib/level/level.class';

export const levelData = {
  currentLevel: new Level({
    intro: '',
    blueprint: [[]],
    entities: { pawns: [] },
  }),
};

export default () => {
  const initializeLevel = async (levelID: number) => {
    const index = levelID - 1;
    if (!levels || !levels[index]) throw new Error(`Level with id "${index}" does not exist.`);
    levelData.currentLevel = new Level(levels[index]);
  };

  return { initializeLevel };
};
