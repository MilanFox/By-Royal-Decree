import { directions, type FeelData, MovableEntity, movableEntityErrors } from './';
import type { Direction } from '@/levels';
import { Pawn } from '@lib/entities/pawn';
import { Knight } from '@lib/entities/knight';

export const endRoutineHandler = (entity: MovableEntity) => {
  entity._isFinished = true;
};

export const walkHandler = async (entity: MovableEntity, dir: Direction) => {
  if (entity.isFinished || entity.isDrowning) return;
  if (!['up', 'right', 'down', 'left'].includes(dir)) throw movableEntityErrors.UNKNOWN_DIR(dir);
  if (entity.isBusy) throw movableEntityErrors.IS_BUSY();

  entity._isBusy = true;
  entity._currentAnimation = entity._shouldUseAlternateWalkingAnimation ? 5 : 1;

  const { x, y } = directions[dir];
  if (x < 0) entity._isWalkingBackwards = true;
  if (x > 0) entity._isWalkingBackwards = false;

  const steps = Math.round(100 / entity.speed);

  const walkingAnimation = async () => {
    for (let i = 0; i < steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000 / (entity.speed * steps)));
      entity._x += x / steps;
      entity._y += y / steps;
    }
  };

  while (true) {
    const retryDelay = 1000 / entity.speed;
    const target = { x: entity.x + x, y: entity.y + y };
    const isTargetBlocked = entity._level.allEntitiesWithCollision
      .some(e => e.blockedPosition.x === target.x && e.blockedPosition.y === target.y);

    if (!isTargetBlocked) {
      entity._blockedPosition = target;
      await walkingAnimation();
      break;
    }

    await new Promise(resolve => setTimeout(resolve, retryDelay));
  }

  /* Iron out potential floating point errors */
  entity._x = Math.round(entity.x);
  entity._y = Math.round(entity.y);

  entity._isBusy = false;
  entity._currentAnimation = entity._shouldUseAlternateWalkingAnimation ? 4 : 0;

  const currentTileIsLand = Boolean(entity._level.map[entity.y]?.[entity.x]);
  if (!currentTileIsLand) {
    entity._isDrowning = true;
    entity._currentAnimation = 6;
  }
};

export const feelHandler = (entity: MovableEntity, dir: Direction): FeelData | undefined => {
  if (entity.isFinished || entity.isDrowning) return;
  if (!['up', 'right', 'down', 'left', undefined].includes(dir)) throw movableEntityErrors.UNKNOWN_DIR(dir);
  if (entity.isBusy) throw movableEntityErrors.IS_BUSY();

  if (dir === undefined) {
    const landTile = entity._level.map[entity.y][entity.x];
    const resource = entity._level.resources.find(r => r.x === entity.x && r.y === entity.y);
    return {
      pawn: entity.name === 'Pawn' ? entity as Pawn : undefined,
      knight: entity.name === 'Knight' ? entity as Knight : undefined,
      landTile,
      resource,
    };
  }

  const { x, y } = directions[dir];
  const landTile = entity._level.map[entity.y + y][entity.x + x];
  const knight = entity._level.knights.find(el => el.x === entity.x + x && el.y === entity.y + y);
  const pawn = entity._level.pawns.find(el => el.x === entity.x + x && el.y === entity.y + y);
  const tree = entity._level.trees.find(el => el.x === entity.x + x && el.y === entity.y + y);
  const resource = entity._level.resources.find(el => el.x === entity.x + x && el.y === entity.y + y);
  return { landTile, pawn, knight, resource, tree };
};
