export const pawnError = {
  UNKNOWN_DIR: (dir: string) =>
    new Error(`Unknown Direction "${dir}" - your pawns can only walk in orthogonal directions ` +
              '"left", "right", "up" and "down".'),
  IS_BUSY: () =>
    new Error('Your Pawn is busy right now fulfilling another task - please wait for them to finish ' +
              'this task first. Pawn actions are asynchronous and need an "await" statement.'),
};
