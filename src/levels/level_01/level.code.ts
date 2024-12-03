const pawn =
  `await pawn.walk('up');
for (let i = 0; i < 2; i++) {
    await pawn.walk('right');
}
pawn.endRoutine();`;

export const defaultCode = { pawn };
