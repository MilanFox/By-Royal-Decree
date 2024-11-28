export const defaultFunctionContext =
  `// Order your pawns to do your bidding - your word is law.
// currently only "walk()" and "endRoutine()" have been implemented

// Example:
await pawn.walk('right');
await pawn.walk('left');
await pawn.walk('right');
await pawn.walk('right');
await pawn.walk('down');

pawn.endRoutine();

// Unreachable because routine has ended already:
await pawn.walk('up');`;
