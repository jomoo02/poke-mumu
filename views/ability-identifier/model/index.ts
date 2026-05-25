import { AbilityEntity } from '@/entities/ability/model';
import { Type } from '@/app/entities/type/model';

interface Ability extends AbilityEntity {
  id: number;
  nameEn: string;
  nameJa: string | null;
  gen: number | null;
  description: string | null;
}

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
