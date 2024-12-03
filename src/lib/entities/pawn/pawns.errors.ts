export const pawnErrors = {
  NO_RESOURCE_TO_PICK_UP: () => new Error('There is no Resource here that your pawn could pick up.'),
  ALREADY_HOLDING_ITEM: () => new Error('Your Pawn is already holding a resource and can\t hold two simultaneously.'),
  NO_RESOURCE_TO_DROP: () => new Error('Your Pawn is not holding any Resource that it could drop.'),
  BLOCKED_SPACE: () => new Error('Can\'t drop resource here, there is already a resource at this position.'),
};
