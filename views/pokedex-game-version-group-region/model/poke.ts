import type { Poke } from '@/entities/poke/model';
import type { Type } from '@/entities/type/model';

export interface RegionalPoke extends Poke {
  regionalDexNumber: number;
  form: string | null;
  type1: Type;
  type2: Type | null;
}
