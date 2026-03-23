import { type Poke } from '@/app/entities/poke/model';

interface PokeFormView extends Poke {
  sprite: string;
  form: string | null;
}

interface SurroundPokeView {
  id: number;
  species: string;
  dexNumber: number;
  name: string;
}

export { type PokeFormView, type SurroundPokeView };
