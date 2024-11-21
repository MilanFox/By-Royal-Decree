import { Pawn } from '@lib/entities/pawn/pawn.class';

interface LevelData {
  entities: {
    pawns: Array<Pawn>
  };
}

export const levelData: LevelData = {
  entities: {
    pawns: [],
  },
};

export default () => {
  const initializeLevel = () => {

    // Temp: Test Entities
    levelData.entities.pawns.push(new Pawn({
      pawnOptions: { color: '#FFFF00', currentAnimation: 0 }, entityOptions: { x: 6, y: 2 },
    }));

    levelData.entities.pawns.push(new Pawn({
      pawnOptions: { color: '#0000FF', currentAnimation: 1 }, entityOptions: { x: 3, y: 5 },
    }));

    levelData.entities.pawns.push(new Pawn({
      pawnOptions: { color: '#00FF00', currentAnimation: 2 }, entityOptions: { x: 5, y: 2 },
    }));

    levelData.entities.pawns.push(new Pawn({
      pawnOptions: { color: '#FF0000', currentAnimation: 3 }, entityOptions: { x: 4, y: 5 },
    }));

    levelData.entities.pawns.push(new Pawn({
      pawnOptions: { color: '#000000', currentAnimation: 4 }, entityOptions: { x: 5, y: 1 },
    }));

    levelData.entities.pawns.push(new Pawn({
      pawnOptions: { color: '#FFFFFF', currentAnimation: 5 }, entityOptions: { x: 5, y: 5 },
    }));
  };

  return { initializeLevel };
};
