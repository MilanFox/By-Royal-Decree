const pawn =
  `while (true) {
  await pawn.walk('right');
  const ahead = pawn.feel('right');

  if (ahead?.knight) {
    pawn.endRoutine();
    break;
  }

  if (ahead?.tree) {
    await pawn.walk('down');
    await pawn.walk('right');
    await pawn.walk('right');
    await pawn.walk('up');
  }
}`;

const knight = 'await knight.walk("right");';

export const defaultCode = { pawn, knight };
