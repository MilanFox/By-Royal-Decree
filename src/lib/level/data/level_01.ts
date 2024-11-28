import { entityColor } from '@lib/entities/_base/';
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
    { x: 1, y: 1, color: entityColor.BLUE },
    { x: 1, y: 2, color: entityColor.RED },
  ],
};

export default { blueprint, entities };
