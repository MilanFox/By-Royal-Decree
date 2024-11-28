import type { PartiallyRequired } from '@lib/types';
import type { MovableEntityProps } from '@lib/entities/_base/';

export type KnightProps = PartiallyRequired<MovableEntityProps, 'x' | 'y' | 'color'>;
