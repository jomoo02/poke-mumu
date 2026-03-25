import { type Poke } from '@/app/entities/poke/model';

interface SurroundPokeView extends Poke {
  id: number;
  species: string;
  dexNumber: number;
  name: string;
}

export { type SurroundPokeView };
