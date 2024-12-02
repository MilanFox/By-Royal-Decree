const pawn =
  `await entity.walk('up');
for (let i = 0; i < 2; i++) {
    await entity.walk('right');
}
entity.endRoutine();`;

export const defaultCode = { pawn };
