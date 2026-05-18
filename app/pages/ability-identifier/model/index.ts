import { Ability } from '@/app/entities/ability/model';
import { Type } from '@/app/entities/type/model';

interface AbilityView extends Ability {
  id: number;
  nameEn: string;
  nameJa: string | null;
  gen: number | null;
  description: string | null;
}

interface AbilityPokeView {
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

export { type AbilityView, type AbilityPokeView };
