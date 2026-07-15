import type { Poke } from '@/entities/poke/model';
import type { Type } from '@/entities/type/model';

import type { PokeLinkPoke } from '@/features/poke-link/model';

export interface RegionalPoke extends PokeLinkPoke {
  // // regionalDexNumber: number;
  // dexNumber: number;
  // form: string | null;
  // type1: Type;
  // type2: Type | null;
}
