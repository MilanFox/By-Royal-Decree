import type { LevelEntityBluePrint } from '@/levels';
import { entityColor } from '@lib/entities/_base';

export const entities: LevelEntityBluePrint = {
  pawns: [
    { x: 1, y: 1, color: entityColor.RED },
    { x: 3, y: 3, color: entityColor.BLUE },
  ],
  knights: [
    { x: 6, y: 1, color: entityColor.RED },
    { x: 5, y: 3, color: entityColor.BLUE },
  ],
  trees: [
    { x: 3, y: 1 },
  ],
};
