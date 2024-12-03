import type { LevelData } from '@lib/level/level.types';

const modules = import.meta.glob('./level_*/index.ts', { eager: true });
type ModuleType = { default: LevelData };
const levels = Object.values(modules as Record<string, ModuleType>).map((mod) => mod.default);

export * from '@lib/level/level.class';
export * from '@lib/level/level.types';

export default levels;
