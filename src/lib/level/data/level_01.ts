import { Level } from '../level.class';
import { Pawn } from '@lib/entities/pawn/pawn.class';
import type { TileName } from '@lib/terrain';

const blueprint: TileName[][] = [
  ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
  ['_', 'grass', 'grass', 'grass', '_', 'grass', '_', '_', '_', '_'],
  ['_', 'grass', 'grass', 'grass', '_', 'grass', '_', '_', '_', '_'],
  ['_', 'grass', 'grass', 'grass', '_', 'grass', '_', '_', '_', '_'],
  ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
  ['_', 'grass', 'grass', 'grass', '_', 'grass', '_', '_', '_', '_'],
  ['_', '_', '_', '_', '_', '_', '_', '_', 'sand', '_'],
  ['_', '_', '_', '_', '_', '_', '_', 'sand', 'sand', '_'],
  ['_', '_', '_', '_', '_', '_', 'sand', 'sand', 'sand', '_'],
  ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
];

const entities = {
  pawns: [
    new Pawn({ entityOptions: { x: 1, y: 1 }, pawnOptions: { color: '#3e8698' } }),
    new Pawn({ entityOptions: { x: 2, y: 3 }, pawnOptions: { color: '#b65555', currentAnimation: 2 } }),
  ],
};

export default new Level({ blueprint, entities });
