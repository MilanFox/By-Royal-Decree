import type { PartiallyRequired } from '@lib/types';
import type { EntityProps } from '@lib/entities/_base';

export type ResourceName = 'wood' | 'gold' | 'meat';

export type ResourceProps = PartiallyRequired<EntityProps, 'x' | 'y'> & { name: ResourceName };
