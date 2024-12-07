import type { Level } from '@lib/level/level.class';
import { Pawn } from '@lib/entities/pawn';

export const validator = (level: Level) => {
  const isHidden = (pawn: Pawn) => Boolean(level.trees.find(tree => tree.x === pawn.x && tree.y === pawn.y + 1));

  const pawnWinConditions = [isHidden];
  const hasMetWinningConditions = (pawn: Pawn) => pawnWinConditions.every(condition => condition(pawn));

  return (level.pawns.every(hasMetWinningConditions));
};
