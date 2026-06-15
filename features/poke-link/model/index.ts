import type { Poke } from '@/entities/poke/model';
import type { Type } from '@/entities/type/model';

interface PokeLinkPoke extends Poke {
  form: string | null;
  dexNumber: number;
  type1: Type;
  type2: Type | null;
}

export { type PokeLinkPoke };
