import { type PokeLinkStatPoke } from '@/features/poke-link/model';

export interface NationalPoke extends PokeLinkStatPoke {
  sortOrder: number;
}
