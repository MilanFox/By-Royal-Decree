import type { LevelEntityBluePrint } from '@/levels';
import { entityColor } from '@lib/entities/_base';

export const entities: LevelEntityBluePrint = {
  pawns: [
    { x: 1, y: 1, color: entityColor.RED },
  ],
  trees: [
    { x: 2, y: 3 },
    { x: 4, y: 3 },
    { x: 6, y: 3 },
    { x: 8, y: 3 },
    { x: 10, y: 3 },
  ],
  resources: [
    { x: 4, y: 7, name: 'gold' },
    { x: 6, y: 7, name: 'meat' },
    { x: 8, y: 7, name: 'wood' },
    { x: 2, y: 1, name: 'gold' },
  ],
};
