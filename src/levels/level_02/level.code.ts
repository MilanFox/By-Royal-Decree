const pawn =
  `while (true) {
  await pawn.walk('right');
  const lookAhead = pawn.feel('right');

  if ( lookAhead?.entity?.name === 'knight') {
    pawn.endRoutine();
    break;
  }

  if (lookAhead?.entity?.name === 'tree') {
    await pawn.walk('down');
    await pawn.walk('right');
    await pawn.walk('right');
    await pawn.walk('up');
  }
}`;

const knight = 'await knight.walk("right");';

export const defaultCode = { pawn, knight };
