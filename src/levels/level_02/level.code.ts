const pawn =
  `while (true) {
  await entity.walk('right');
  const lookAhead = entity.feel('right');

  if ( lookAhead?.entity?.name === 'knight') {
    entity.endRoutine();
    break;
  }

  if (lookAhead?.entity?.name === 'tree') {
    await entity.walk('down');
    await entity.walk('right');
    await entity.walk('right');
    await entity.walk('up');
  }
}`;

const knight = 'await entity.walk("right");';

export const defaultCode = { pawn, knight };
