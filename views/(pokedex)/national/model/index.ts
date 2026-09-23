import { Poke } from '@/entities/poke-v2/model';

interface NationalPoke extends Poke {
  form: {
    shortKo: string | null;
    nameKo: string;
    identifier: string;
  } | null;
  type1: {
    identifier: string;
    nameKo: string;
  };
  type2: {
    identifier: string;
    nameKo: string;
  } | null;
  generation: number | null;
}

export { type NationalPoke };
