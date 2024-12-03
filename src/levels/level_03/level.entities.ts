import type { LevelEntityBluePrint } from '@/levels';
import { entityColor } from '@lib/entities/_base';

export const entities: LevelEntityBluePrint = {
  pawns: [
    { x: 1, y: 2, color: entityColor.RED },
  ],
  trees: [
    { x: 2, y: 3 },
    { x: 4, y: 3 },
    { x: 6, y: 3 },
    { x: 8, y: 3 },
    { x: 10, y: 3 },
  ],
};
