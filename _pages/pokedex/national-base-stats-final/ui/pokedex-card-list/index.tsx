import type { BaseStatsPoke } from '../../model/base-stats-poke';
import type { NameLanguage } from '../../model/name-language';

import Card from './card';

interface PokedexCardListProps {
  pokes: BaseStatsPoke[];
  language: NameLanguage;
}

export default function PokedexCardList({
  pokes,
  language,
}: PokedexCardListProps) {
  return (
    <ul className="grid ">
      {pokes.map((poke) => (
        <li key={poke.pokeKey}>
          <Card poke={poke} language={language} />
        </li>
      ))}
    </ul>
  );
}
