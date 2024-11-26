import { pawnColors } from '@lib/entities/pawn/pawn.const';
import type { LevelEntityBluePrint, LevelMapBlueprint } from '@lib/level/level.types';

const blueprint: LevelMapBlueprint = [
  ['🟩', '🟩', '🟩', '🟩', '🟩'],
  ['🟩', '🟩', '🟩', '🟩', '🟩'],
  ['🟩', '🟩', '🟦', '🟩', '🟩'],
  ['🟩', '🟦', '🟦', '🟦', '🟩'],
  ['🟩', '🟩', '🟩', '🟩', '🟩'],
  ['🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟨'],
  ['🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟨', '🟨'],
  ['🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟨', '🟨', '🟨'],
];

const entities: LevelEntityBluePrint = {
  pawns: [
    { x: 1, y: 1, color: pawnColors.BLUE },
    { x: 1, y: 2, color: pawnColors.RED },
  ],
};

export default { blueprint, entities };
