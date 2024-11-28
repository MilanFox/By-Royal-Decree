import type { LevelConstructorOptions, LevelData, SpriteTileLookupOptions } from './level.types';
import { tileFactory } from '@lib/terrain';
import { Pawn } from '@lib/entities/pawn';
import { Knight } from '@lib/entities/knight';
import { Entity, MovableEntity } from '@lib/entities/_base';

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
      pawns: options.entities.pawns?.map(entityData => new Pawn(entityData, this)),
      knights: options.entities.knights?.map(entityData => new Knight(entityData, this)),
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
  get allEntities() { return Object.values(this.entities).flat() as Entity[]; }
  get waterTouchingTiles() { return this.flatMap.filter(tile => this.#isAdjacentToWater(tile)); }

  /* --- --- --- --- --- RENDERER API --- --- --- --- --- */

  #calculateSpriteTileIndex({ x, y, tileName, blueprint }: SpriteTileLookupOptions) {
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
        if (neighborTile === tileName) tilingType += value;
      }
    }

    return tilingType;
  }

  #isAdjacentToWater({ x, y }: { x: number; y: number }): boolean {
    const directions = [
      { dx: 0, dy: -1 }, { dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 },
      { dx: -1, dy: -1 }, { dx: 1, dy: -1 }, { dx: -1, dy: 1 }, { dx: 1, dy: 1 },
    ];
    return directions.some(({ dx, dy }) => {
      const neighborX = x + dx;
      const neighborY = y + dy;
      const isNeighborLand = Boolean(this.#properties.map[neighborY]?.[neighborX]);
      return (!isNeighborLand);
    });
  }
}
