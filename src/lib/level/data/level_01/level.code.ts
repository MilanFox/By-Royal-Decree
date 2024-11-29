const pawn =
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
await entity.walk('up');`;

const knight =
  `//You'll figure it out from here...

await entity.walk('right');
entity.endRoutine();`;

export const defaultCode = { pawn, knight };
