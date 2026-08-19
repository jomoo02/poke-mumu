'use client';

import { Button } from '@/shared/ui/button';
import type { Move } from '@/entities/move/model';

import MoveItem from './move-item';
import useMoveList from './useMoveList';
import useVisible from './useVisible';

interface MoveListProps {
  moves: Move[];
}

const NO_RESULT_FOUND = '일치하는 기술이 없습니다.';

export default function MoveList({ moves }: MoveListProps) {
  const { filteredMoves } = useMoveList(moves);

  const { visibleMoves, remaining, moreButtonContent, nextVisibleCount } =
    useVisible(filteredMoves);

  const currentMoveCount = `${filteredMoves.length}개의 기술`;

  return (
    <div className="flex flex-col gap-6">
      <div aria-live="polite" className="text-sm text-foreground/70">
        {currentMoveCount}
      </div>
      {filteredMoves.length === 0 ? (
        <div className="font-medium text-muted-foreground">
          {NO_RESULT_FOUND}
        </div>
      ) : (
        <>
          {/* <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"> */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {visibleMoves.map((move) => (
              <MoveItem move={move} key={move.identifier} />
            ))}
          </div>
          {remaining > 0 && (
            <div className="flex justify-center mt-3">
              <Button
                variant={'outline'}
                className="w-full h-11 max-w-48 shadow-sm"
                onClick={nextVisibleCount}
              >
                {moreButtonContent}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
