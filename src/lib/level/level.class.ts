import type { LevelConstructorOptions, LevelData, LevelMapBlueprint } from './level.types';
import { tileFactory } from '@lib/terrain';
import { Pawn } from '@lib/entities/pawn/pawn.class';

export class Level {
  constructor(options: LevelConstructorOptions) {
    this.#properties.map = options.blueprint.map((row, y) =>
      row.map((tileName, x) => {
        const tile = tileFactory[tileName](x, y);
        if (!tile) return tile;
        tile.setSpriteTileIndex(this.#calculateSpriteTileIndex({ x, y, tileName, blueprint: options.blueprint }));
        return tile;
      }),
    );

    this.#properties.entities = {
      pawns: options.entities.pawns.map(entityData => new Pawn(entityData, this)),
    };

    this.#properties.flatMap = this.#properties.map.flat().filter(tile => tile !== null);
  }

  #properties: LevelData = {
    map: [[]],
    flatMap: [],
    entities: {
      pawns: [],
    },
  };

  /* --- --- --- --- --- PUBLIC GETTERS --- --- --- --- --- */

  get map() { return this.#properties.map; }
  get flatMap() { return this.#properties.flatMap; }
  get entities() { return this.#properties.entities; }
  get allEntities() { return Object.values(this.entities).flat() as Pawn[]; }

  /* --- --- --- --- --- RENDERER API --- --- --- --- --- */

  #calculateSpriteTileIndex({ x, y, tileName, blueprint }: {
    x: number,
    y: number,
    tileName: string,
    blueprint: LevelMapBlueprint
  }) {
    let tilingType = 0;

    const neighbors = [
      { x, y: y - 1, value: 1 },
      { x: x + 1, y, value: 2 },
      { x, y: y + 1, value: 4 },
      { x: x - 1, y, value: 8 },
    ];

    for (const { x: nx, y: ny, value } of neighbors) {
      if (blueprint[ny] && blueprint[ny][nx]) {
        const neighborTile = blueprint[ny][nx];
        if (neighborTile === tileName) {
          tilingType += value;
        }
      }
    }

    return tilingType;
  }
}
