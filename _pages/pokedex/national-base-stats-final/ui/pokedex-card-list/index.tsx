import type { BaseStatsPoke } from '../../model/base-stats-poke';

import Card from './card';
import CardV2 from './card-v2';
import CardV3 from './card-v3 copy';
import CardV4 from './card-v4';

interface PokedexCardListProps {
  pokes: BaseStatsPoke[];
}

export default function PokedexCardList({ pokes }: PokedexCardListProps) {
  return (
    <ul className="grid gap-4 sm:gap-6 sm:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
      {pokes.map((poke) => (
        <li key={poke.pokeKey}>
          <CardV2 poke={poke} />
        </li>
      ))}
    </ul>
  );
}
