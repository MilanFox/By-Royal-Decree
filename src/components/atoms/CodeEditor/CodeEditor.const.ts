export const defaultFunctionContext =
  `async ( pawn ) => {
    /* DEMO CODE! Not yet doing much except for console logs.
    Currently gets triggered by "CMD"+"S". Work in Progress. */
    await pawn.pickUp();
    await pawn.walk('left');
    await pawn.drop();
    pawn.endRoutine();
}`;
