import { type NationalPoke } from '../model';
import PokeCard from './poke-card';

interface PokeCardListProps {
  pokes: NationalPoke[];
}

// 가상화 없는 단순 반응형 그리드(한 페이지 ≤60).
export default function PokeCardList({ pokes }: PokeCardListProps) {
  if (pokes.length === 0) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        조건에 맞는 포켓몬이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pokes.map((poke) => (
        <PokeCard key={poke.pokeKey} poke={poke} />
      ))}
    </div>
  );
}
