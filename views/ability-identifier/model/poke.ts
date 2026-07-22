import type { Type } from '@/app/entities/type/model';
import type { Poke } from '@/entities/poke/model';

export interface AbilityPoke extends Poke {
  pokeKey: string;
  nameKo: string;
  form: string | null;
  dexNumber: number;
  type1: Type;
  type2: Type | null;
  sprite: string;
  isHidden: boolean;
  slot: number | null;
  isDefault: boolean;
}
