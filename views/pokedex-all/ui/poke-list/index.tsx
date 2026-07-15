import { RotateCwIcon } from 'lucide-react';

import { PokeStatsLink } from '@/features/poke-link/ui';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

import { type NationalPoke } from '../../model/poke';

interface PokeListProps {
  filteredCount: number;
  isDimmed: boolean;
  pagePokes: NationalPoke[];
  startIndex: number;
  sortKey: string;
  onResetAll: () => void;
}

export default function PokeList({
  filteredCount,
  isDimmed,
  pagePokes,
  startIndex,
  sortKey,
  onResetAll,
}: PokeListProps) {
  return (
    <div className="min-h-50 md:min-h-78">
      {filteredCount === 0 ? (
        <div className="h-50 md:h-78 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">
            조건에 맞는 포켓몬이 없습니다.
          </p>
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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {pagePokes.map((poke, index) => (
              <PokeStatsLink
                key={poke.pokeKey}
                poke={poke}
                index={startIndex + index + 1}
                sortKey={sortKey}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
