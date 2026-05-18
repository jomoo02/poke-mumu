import { type Poke } from '@/app/entities/poke/model';

interface PokeFormView extends Poke {
  pokeKey: string;
  nameKo: string;
  form: string | null;
  sprite: string;
}

export { type PokeFormView };
