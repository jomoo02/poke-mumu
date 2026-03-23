import { type Poke } from '@/app/entities/poke/model';
import { type Stats } from '@/app/entities/stats/model';
import { type Type } from '@/app/entities/type/model';

export interface NationalPokeView extends Poke, Stats {
  type1: Type | null;
  type2: Type | null;
}

export {
  type Direction,
  type SortKey,
  isDefaultSort,
  getSortLabel,
  type SortOption,
  getComparator,
  getSortOptions,
  DEFAULT_SORT,
} from './pokedex-sort';
