import { type NationalPoke } from '../model';
import PokeCard from './poke-card';
import PokeCardV2 from './poke-card-v2';

interface PokeCardListProps {
  pokes: NationalPoke[];
  startIndex: number; // 현재 페이지 첫 항목의 전역(0-based) 오프셋
  sortKey: string; // 현재 정렬 키(카드에서 해당 필드 강조)
}

// 가상화 없는 단순 반응형 그리드(한 페이지 ≤80).
export default function PokeCardList({
  pokes,
  startIndex,
  sortKey,
}: PokeCardListProps) {
  if (pokes.length === 0) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        조건에 맞는 포켓몬이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pokes.slice(0, 5).map((poke, idx) => (
          <PokeCardV2 key={poke.pokeKey} poke={poke} index={idx + 1} />
        ))}
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pokes.map((poke, idx) => (
          <PokeCardV2
            key={poke.pokeKey}
            poke={poke}
            index={startIndex + idx + 1}
            sortKey={sortKey}
          />
        ))}
      </div>
    </div>
  );
}
