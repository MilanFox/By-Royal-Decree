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
    { x: 0, y: 4, color: entityColor.LAVENDER },
  ],
  knights: [
    { x: 1, y: 4, color: entityColor.YELLOW },
  ],
};

const intro = 'Hello, this is currently not a level, but just a playground. Feel free to snoop around anyways.';

const defaultCode = {
  pawn:
    `// Order your entities to do your bidding - your word is law.
// currently only "walk()" and "endRoutine()" have been implemented

// Example:
await entity.walk('right');
await entity.walk('left');
await entity.walk('right');
await entity.walk('right');
await entity.walk('down');

entity.endRoutine();

// Unreachable because routine has ended already:
await entity.walk('up');`,
  knight:
    `//You'll figure it out from here...

await entity.walk('right');
entity.endRoutine();`,
};

export default { blueprint, entities, intro, defaultCode };
