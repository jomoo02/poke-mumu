'use client';

import type { BaseStatsPoke } from '../../../model/base-stats-poke';
import { usePokeSort } from '../../../model/poke-sort';
import PokeListItem from './poke-list-item';

interface PokeListProps {
  pokes: BaseStatsPoke[];
}

export default function PokeList({ pokes }: PokeListProps) {
  const { sortState } = usePokeSort();

  return (
    <ul>
      {pokes.map((poke) => (
        <PokeListItem key={poke.pokeKey} poke={poke} sortKey={sortState.sort} />
      ))}
    </ul>
  );
}
