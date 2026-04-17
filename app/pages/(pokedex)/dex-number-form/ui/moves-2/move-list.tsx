'use client';

import { cn } from '@/app/shared/lib/cn';
import { Input } from '@/app/shared/ui/input';
import { useMoveDataNew } from '../../model/moves-2';
import { type PokeMoves } from '../../model/moves-2';
import { useMoveListSort } from '../../model/moves-2/useMoveListSort';
import MoveRow from './move-row';
import SortButtons from './sort-buttons';

interface MoveListProps {
  pokeMoves: PokeMoves | undefined;
  versionGroupId: number;
}

export default function MoveList({ pokeMoves, versionGroupId }: MoveListProps) {
  const { isLoading, moves } = useMoveDataNew(pokeMoves, versionGroupId);
  const { sorted, sortMode, setSortMode, query, setQuery } =
    useMoveListSort(moves);

  return (
    <div className="flex flex-col gap-4 sm:min-h-[500px]">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="기술 이름 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sm:max-w-56"
        />
        <div className="overflow-x-auto pb-1">
          <SortButtons sortMode={sortMode} onSort={setSortMode} />
        </div>
      </div>

      <div
        className={cn(
          'overflow-x-auto rounded-2xl border ',
          isLoading && 'opacity-70',
        )}
      >
        {sorted.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground h-full flex items-center justify-center">
            기술 정보가 없습니다.
          </div>
        ) : (
          <div className="min-w-max w-full">
            {sorted.map((move) => (
              <MoveRow
                key={`${move.method}-${move.moveId}-${move.label}`}
                move={move}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
