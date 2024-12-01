import type { PartiallyRequired } from '@lib/types';
import type { EntityProps } from '@lib/entities/_base/';

export type TreeProps = PartiallyRequired<EntityProps, 'x' | 'y'>;
