export const defaultFunctionContext =
  `/**
  Order your pawns to do your bidding - your word is law.
  */
  async ( pawn ) => {
    await pawn.walk('right');
    await pawn.walk('left');
    await pawn.walk('right');
    await pawn.walk('right');
    await pawn.walk('down');
    pawn.endRoutine();
    await pawn.walk('up'); /* Unreachable because routine has ended */
}`;
