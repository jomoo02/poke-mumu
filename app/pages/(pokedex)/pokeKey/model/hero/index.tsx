import { type Poke } from '@/app/entities/poke/model';
import { type Type } from '@/app/entities/type/model';

interface HeroView extends Poke {
  nameEn: string;
  nameJa: string;
  type1: Type;
  type2: Type | null;
  dexNumber: number;
  height: string | null;
  weight: string | null;
}

export { type HeroView };
