import type { Poke } from '@/entities/poke-v2/model';
import type { Type } from '@/entities/type/model';
import type { Stat } from '@/entities/stat/model';

interface PokeLinkPoke extends Poke {
  type1: Type;
  type2: Type | null;
}

interface PokeLinkStatPoke extends Poke, Stat {
  type1: Type;
  type2: Type | null;
  total: number;
}

export { type PokeLinkPoke, type PokeLinkStatPoke };
