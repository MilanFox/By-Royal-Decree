import { pawnColors } from '@lib/entities/pawn/pawn.const';
import type { LevelEntityBluePrint, LevelMapBlueprint } from '@lib/level/level.types';

const blueprint: LevelMapBlueprint = [
  ['grass', 'grass', 'grass', 'grass', 'grass'],
  ['grass', 'grass', 'grass', 'grass', 'grass'],
  ['grass', 'grass', '_', 'grass', 'grass'],
  ['grass', '_', '_', '_', 'grass'],
  ['grass', 'grass', 'grass', 'grass', 'grass'],
  ['_', '_', '_', '_', '_', '_', '_', '_', 'sand'],
  ['_', '_', '_', '_', '_', '_', '_', 'sand', 'sand'],
  ['_', '_', '_', '_', '_', '_', 'sand', 'sand', 'sand'],
];

const entities: LevelEntityBluePrint = {
  pawns: [
    { x: 1, y: 1, color: pawnColors.BLUE },
    { x: 1, y: 2, color: pawnColors.RED },
  ],
};

export default { blueprint, entities };
