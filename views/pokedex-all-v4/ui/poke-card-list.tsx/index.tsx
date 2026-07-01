import { cn } from '@/shared/lib/cn';
import { type NationalPoke } from '../../model/poke';
import PokeCard from './poke-card';

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
      <div className="h-50 flex items-center justify-center text-muted-foreground">
        조건에 맞는 포켓몬이 없습니다.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6',
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
