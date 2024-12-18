import type { PartiallyRequired } from '@lib/types';
import type { MovableEntityProps } from '@lib/entities/_base/';

export type PawnProps = PartiallyRequired<MovableEntityProps, 'x' | 'y' | 'color'>;
