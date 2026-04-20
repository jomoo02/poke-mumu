'use client';

import { cn } from '@/app/shared/lib/cn';
import { Input } from '@/app/shared/ui/input';
import { useMoveDataNew } from '../../model/moves-2';
import { type PokeMoves } from '../../model/moves-2';
import { useMoveListSort } from '../../model/moves-2/useMoveListSort';
import MoveRow from './move-row';
import SortButtons from './sort-buttons';
import { Fragment } from 'react/jsx-runtime';
import MoveRowZa from './move-row-za';
import { Button } from '@/app/shared/ui/button';
import { XIcon } from 'lucide-react';

interface MoveListProps {
  pokeMoves: PokeMoves | undefined;
  versionGroupId: number;
}

export default function MoveList({ pokeMoves, versionGroupId }: MoveListProps) {
  const { isLoading, moves } = useMoveDataNew(pokeMoves, versionGroupId);
  const { sorted, sortMode, setSortMode, query, setQuery } = useMoveListSort(
    moves,
    versionGroupId,
  );

  return (
    <div className="flex flex-col gap-5 sm:min-h-125">
      <div className="flex flex-col sm:flex-row gap-6 sm:justify-between">
        <div
          className={cn(
            'flex-1 max-w-lg  relative flex items-center',
            isLoading && 'opacity-70',
          )}
        >
          <Input
            placeholder="Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=" min-h-10 rounded-4xl  px-4 bg-muted dark:bg-input border-transparent"
          />
          {query !== '' && (
            <Button
              variant={'ghost'}
              className="absolute right-4"
              onClick={() => setQuery('')}
              size={'icon-sm'}
            >
              <XIcon />
            </Button>
          )}
        </div>

        <div className={cn('flex justify-end', isLoading && 'opacity-70')}>
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
              <Fragment key={`${move.method}-${move.moveId}-${move.label}`}>
                {versionGroupId === 22 ? (
                  <MoveRowZa move={move} />
                ) : (
                  <MoveRow move={move} />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
