import type { BaseStatsPoke } from '../../model/poke';
import Card from './card';

interface PokedexCardListProps {
  pokes: BaseStatsPoke[];
}

export default function PokedexCardList({ pokes }: PokedexCardListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
      {pokes.map((poke) => (
        <li key={poke.pokeKey}>
          <Card poke={poke} />
        </li>
      ))}
    </ul>
  );
}
