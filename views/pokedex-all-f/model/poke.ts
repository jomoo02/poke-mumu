import { type Poke } from '@/entities/poke/model';
import { type Stat } from '@/entities/stat/model';
import { type Type } from '@/entities/type/model';

export interface NationalPoke extends Poke, Stat {
  type1: Type | null;
  type2: Type | null;
  dexNumber: number;
  total: number;
  sortOrder: number;
  formIdentifier: string | null;
  formKo: string | null;
}
