import type { Level } from '@lib/level/level.class';
import { Resource } from '@lib/entities/resource';

export const validator = (level: Level) => {
  const isOnFloor = (res: Resource) => !res.isBeingHeld;
  const isVisible = (res: Resource) => Boolean(level.trees.find(tree => tree.x === res.x && tree.y === res.y - 1));

  const resourceWinConditions = [isOnFloor, isVisible];
  const hasMetWinningConditions = (resource: Resource) => resourceWinConditions.every(condition => condition(resource));
  
  return (level.resources.every(hasMetWinningConditions));
};
