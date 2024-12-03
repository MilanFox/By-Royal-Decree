const pawn =
  `while (true) {
    await pawn.walk('right');
    const curPos = pawn.feel();

    if (curPos.resource && curPos.resource.name === 'gold') {
        pawn.pickUp();
        await pawn.walk('right');
        await pawn.walk('down');
        await pawn.walk('down');
        await pawn.walk('left');
        pawn.drop();
        break;
    }
}

await pawn.walk('left');
pawn.endRoutine();`;

export const defaultCode = { pawn };
