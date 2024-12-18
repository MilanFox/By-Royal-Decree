import type { LevelConstructorOptions, LevelData, SpriteTileLookupOptions } from './level.types';
import { tileFactory } from '@lib/terrain';
import { Pawn } from '@lib/entities/pawn';
import { Knight } from '@lib/entities/knight';
import { Entity } from '@lib/entities/_base';
import { Tree } from '@lib/entities/tree';
import { Resource } from '@lib/entities/resource';

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
      pawns: options.entities.pawns?.map(entityData => new Pawn(entityData, this)) ?? [],
      knights: options.entities.knights?.map(entityData => new Knight(entityData, this)) ?? [],
      trees: options.entities.trees?.map(entityData => new Tree(entityData, this)) ?? [],
      resources: options.entities.resources?.map(entityData => new Resource(entityData, this)) ?? [],
    };

    this.#properties.flatMap = this.#properties.map.flat().filter(tile => tile !== undefined);

    this.#properties.defaultCode = options.defaultCode;
    this.#properties.intro = options.intro;

    this.validate = options.validator;
  }

  #properties: LevelData = {
    title: '',
    intro: '',
    map: [[]],
    flatMap: [],
    entities: {},
  };

  validate: (level: Level) => boolean;

  get title() { return this.#properties.title; }
  get intro() { return this.#properties.intro; }
  get defaultCode() { return this.#properties.defaultCode; }

  get map() { return this.#properties.map; }
  get flatMap() { return this.#properties.flatMap; }
  get waterTouchingTiles() { return this.flatMap.filter(tile => this.#isAdjacentToWater(tile)); }

  get entities() { return this.#properties.entities; }
  get allEntities() { return Object.values(this.entities).flat() as Entity[]; }
  get allEntitiesWithCollision() { return Object.values(this.entities).flat().filter(e => e.hasCollision) as Entity[]; }
  get knights() { return [...this.#properties.entities.knights ?? []]; }
  get pawns() { return [...this.#properties.entities.pawns ?? []]; }
  get trees() { return [...this.#properties.entities.trees ?? []]; }
  get resources() { return [...this.#properties.entities.resources ?? []]; }

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
