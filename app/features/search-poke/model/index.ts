import { Poke } from '@/app/entities/poke/model';
import { Type } from '@/app/entities/type/model';

export interface SearchPoke extends Poke {
  type1: Type | null;
  type2: Type | null;
}
