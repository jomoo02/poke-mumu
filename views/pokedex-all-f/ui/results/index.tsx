import { RotateCwIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

import type { NationalPoke } from '../../model/poke';
import PokeCardList from '../poke-card-list';

interface PokedexResultsProps {
  filteredCount: number;
  isDimmed: boolean;
  pagePokes: NationalPoke[];
  startIndex: number;
  sortKey: string;
  onResetAll: () => void;
}

// 결과 영역: 빈 상태(초기화 안내) 또는 카드 리스트(네비게이션 전환 중 dim).
export default function PokedexResults({
  filteredCount,
  isDimmed,
  pagePokes,
  startIndex,
  sortKey,
  onResetAll,
}: PokedexResultsProps) {
  return (
    <div className="min-h-50 md:min-h-78">
      {filteredCount === 0 ? (
        <div className="h-50 md:h-78 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <p>조건에 맞는 포켓몬이 없습니다.</p>
          <Button variant="outline" onClick={onResetAll} className="gap-2">
            <RotateCwIcon className="size-4" />
            필터·검색 초기화
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            'transition-opacity duration-200',
            isDimmed && 'opacity-60',
          )}
          aria-busy={isDimmed}
        >
          <PokeCardList
            pokes={pagePokes}
            startIndex={startIndex}
            sortKey={sortKey}
          />
        </div>
      )}
    </div>
  );
}
