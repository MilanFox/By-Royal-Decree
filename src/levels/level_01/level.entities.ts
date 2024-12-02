import type { LevelEntityBluePrint } from '@/levels';
import { entityColor } from '@lib/entities/_base';

export const entities: LevelEntityBluePrint = {
  pawns: [
    { x: 3, y: 3, color: entityColor.BLUE },
    { x: 2, y: 6, color: entityColor.RED },
    { x: 5, y: 8, color: entityColor.LAVENDER },
  ],
  trees: [
    { x: 5, y: 3 },
    { x: 4, y: 6 },
    { x: 1, y: 4 },
    { x: 2, y: 8 },
    { x: 7, y: 8 },
    { x: 8, y: 5 },
  ],
};
