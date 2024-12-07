import type { Level } from '@lib/level/level.class';
import { Pawn } from '@lib/entities/pawn';

export const validator = (level: Level) => {
  const isStandingBehindAKnight = (pawn: Pawn) => Boolean(level.knights
    .find(knight => knight.x === pawn.x + 1 && knight.y === pawn.y));

  const pawnWinConditions = [isStandingBehindAKnight];
  const hasMetWinningConditions = (pawn: Pawn) => pawnWinConditions.every(condition => condition(pawn));

  return (level.pawns.every(hasMetWinningConditions));
};
