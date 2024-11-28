export const movableEntityErrors = {
  UNKNOWN_DIR: (dir: string) =>
    new Error(`Unknown Direction "${dir}" - Entities can only walk in orthogonal directions ` +
              '"left", "right", "up" and "down".'),
  IS_BUSY: () =>
    new Error('The Entity is busy right now fulfilling another task - please wait for them to finish ' +
              'this task first. Entity actions are asynchronous and need an "await" statement.'),
};
