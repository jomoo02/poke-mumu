import type { Type } from '@/entities/type/model';
import type { Poke } from '@/entities/poke-v2/model';

export interface AbilityPoke extends Poke {
  pokeKey: string;
  nameKo: string;
  form: {
    identifier: string;
    shortKo: string | null;
  };
  type1: Type;
  type2: Type | null;
  isHidden: boolean;
  isDefault: boolean;
}
