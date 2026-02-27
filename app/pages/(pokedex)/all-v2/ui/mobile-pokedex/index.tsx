import { NationalPokeView } from '../../model';
import MobilePokeCard from './poke-card';

interface MobilePokedexProps {
  pokes: NationalPokeView[];
}

export default function MobilePokedex({ pokes }: MobilePokedexProps) {
  return <MobilePokeCard poke={pokes[0]} />;
}
