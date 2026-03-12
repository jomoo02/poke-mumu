import { type NationalPokeView } from '@/app/pages/(pokedex)/all/model';

import PokeCard from './poke-card';
import PokeCardV2 from './card-v2';

export default function CardGrid({ pokes }: { pokes: NationalPokeView[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 px-4 sm:px-6 xl:px-14">
      {pokes.map((poke) => (
        <PokeCard key={poke.pokeKey} poke={poke} />
      ))}
    </div>
  );
}
