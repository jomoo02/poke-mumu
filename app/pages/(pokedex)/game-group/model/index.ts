import { type Poke } from '@/app/entities/poke/model';
import { type Type } from '@/app/entities/type/model';

export interface RegionalPokeView extends Poke {
  regionalDexNumber: number;
  type1: Type | null;
  type2: Type | null;
}
