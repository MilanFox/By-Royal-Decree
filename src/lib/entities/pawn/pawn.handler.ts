import type { Pawn } from '@lib/entities/pawn/pawn.class';
import { movableEntityErrors } from '@lib/entities/_base';
import { pawnErrors } from '@lib/entities/pawn/pawns.errors';

export const pickUpHandler = (pawn: Pawn) => {
  if (pawn.isBusy) throw movableEntityErrors.IS_BUSY();
  if (pawn.isHoldingResource) throw pawnErrors.ALREADY_HOLDING_ITEM();

  const resource = pawn._level.resources.find(r => r.x === pawn.x && r.y === pawn.y);
  if (!resource) throw pawnErrors.NO_RESOURCE_TO_PICK_UP();

  pawn._heldResource = resource;
  pawn._shouldUseAlternateWalkingAnimation = true;
  pawn._currentAnimation = 4;
  resource._heldBy = pawn;
};

export const dropHandler = (pawn: Pawn) => {
  if (pawn.isBusy) throw movableEntityErrors.IS_BUSY();
  if (!pawn.isHoldingResource) throw pawnErrors.NO_RESOURCE_TO_DROP();

  const resourcesAtPosition = pawn._level.resources.filter(r => r.x === pawn.x && r.y === pawn.y);
  const isResourceAlreadyPresent = resourcesAtPosition.length > 1;
  if (isResourceAlreadyPresent) throw pawnErrors.BLOCKED_SPACE();

  const resource = pawn._heldResource;
  resource!._heldBy = undefined;
  resource!._x = pawn.x;
  resource!._y = pawn.y;

  pawn._heldResource = undefined;
  pawn._shouldUseAlternateWalkingAnimation = false;
  pawn._currentAnimation = 0;
};
