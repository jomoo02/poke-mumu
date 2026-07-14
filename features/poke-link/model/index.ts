import type { Poke } from '@/entities/poke/model';
import type { Type } from '@/entities/type/model';
import { type Stat } from '@/entities/stat/model';

interface PokeLinkPoke extends Poke {
  form: string | null;
  dexNumber: number;
  type1: Type;
  type2: Type | null;
}

interface PokeLinkStatPoke extends Poke, Stat {
  type1: Type | null;
  type2: Type | null;
  dexNumber: number;
  total: number;
  formIdentifier: string | null;
  formKo: string | null;
}

export { type PokeLinkPoke, type PokeLinkStatPoke };
