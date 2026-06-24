import { type Poke } from '@/entities/poke/model';
import { type Stat } from '@/entities/stat/model';
import { type Type } from '@/entities/type/model';

// v2(`views/pokedex-all-v2/model-v2`)의 NationalPoke 형태를 그대로 가져온다.
// 실제 컬럼명(nameKo, dexNumber, formIdentifier, flat stats, total, sortOrder)에 맞춘다.
export interface NationalPoke extends Poke, Stat {
  type1: Type | null;
  type2: Type | null;
  dexNumber: number;
  total: number;
  sortOrder: number;
  formIdentifier: string | null;
  formKo: string | null;
}

export type PokeFilter = (poke: NationalPoke) => boolean;
