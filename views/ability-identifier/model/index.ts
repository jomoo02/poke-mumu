import { Ability as A } from '@/entities/ability/model';
import { Type } from '@/app/entities/type/model';

interface Ability extends A {}

interface Poke {
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

export { type Ability, type Poke };
