import { cn } from '@/shared/lib/cn';

import PokeCard from './poke-card';
import { type NationalPoke } from '../../model/poke';

interface PokeCardListProps {
  pokes: NationalPoke[];
  startIndex: number;
  sortKey: string;
}

// 가상화 없는 단순 반응형 그리드(한 페이지 ≤80).
export default function PokeCardList({
  pokes,
  startIndex,
  sortKey,
}: PokeCardListProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6',
      )}
    >
      {pokes.map((poke, idx) => (
        <PokeCard
          key={poke.pokeKey}
          poke={poke}
          index={startIndex + idx + 1}
          sortKey={sortKey}
        />
      ))}
    </div>
  );
}
