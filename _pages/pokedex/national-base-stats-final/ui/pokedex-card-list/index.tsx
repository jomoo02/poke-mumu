import type { BaseStatsPoke } from '../../model/base-stats-poke';
import type { NameLanguage } from '../../model/name-language';
import type { PokeSort } from '../../model/sort';

import Card from './card';

interface PokedexCardListProps {
  pokes: BaseStatsPoke[];
  sortState: PokeSort;
  language: NameLanguage;
}

export default function PokedexCardList({
  pokes,
  sortState,
  language,
}: PokedexCardListProps) {
  return (
    <div
      data-sort={sortState.sort}
      className="group/cards grid md:grid-cols-2 sm:gap-6"
    >
      {pokes.map((poke) => (
        <Card key={poke.pokeKey} poke={poke} language={language} />
      ))}
    </div>
  );
}
