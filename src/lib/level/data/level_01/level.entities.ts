import type { LevelEntityBluePrint } from '@lib/level';
import { entityColor } from '@lib/entities/_base';

export const entities: LevelEntityBluePrint = {
  pawns: [
    { x: 1, y: 1, color: entityColor.BLUE },
    { x: 1, y: 2, color: entityColor.RED },
    { x: 0, y: 4, color: entityColor.LAVENDER },
  ],
  knights: [
    { x: 1, y: 4, color: entityColor.YELLOW },
  ],
};
