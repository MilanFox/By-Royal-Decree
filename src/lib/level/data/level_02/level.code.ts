const pawn =
  `while (true) {
  await entity.walk('right');
  const { entity: nextEntity } = entity.feel('right');

  if ( nextEntity?.name === 'knight') {
    entity.endRoutine();
  }

  if (nextEntity?.name === 'tree') {
    await entity.walk('down');
    await entity.walk('right');
    await entity.walk('right');
    await entity.walk('up');
  }
}`;

const knight = '// Why would the knights need to move? The peasants should work!';

export const defaultCode = { pawn, knight };
