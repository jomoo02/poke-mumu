'use client';

import { useLayoutEffect, useRef } from 'react';

import type { Move } from '@/_entities/move';
// 비교용 페이지라 기존 기술 목록의 빈 상태를 그대로 쓴다
import MoveEmpty from '@/_pages/move/list/ui/results/move-empty';

import MoveTable from './move-table';
import MoveCards from './move-cards';
import { useListLayout } from '../model/use-list-layout';

interface MoveResultsProps {
  // 검색·필터·정렬을 거친 전체 기술 (페이지네이션 없음)
  moves: Move[];
}

// 개수·정렬은 툴바에 있다. 부모(flex-col gap-6)의 한 칸으로 들어간다
export default function MoveResults({ moves }: MoveResultsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const layout = useListLayout();

  // 검색·필터·정렬로 목록이 바뀌면 목록 위(사이트 헤더 바로 아래)로.
  // 목록 위쪽이 보이고 있으면(툴바를 보고 있으면) 그대로 둔다
  const prevMovesRef = useRef(moves);

  useLayoutEffect(() => {
    if (prevMovesRef.current === moves) {
      return;
    }
    prevMovesRef.current = moves;

    const root = rootRef.current;
    if (!root) {
      return;
    }

    // scroll-mt의 계산값 = 사이트 헤더 높이(px). 목록 위가 헤더 밑으로 들어갔을 때만 올린다.
    // scrollIntoView는 html의 scroll-padding-top(앵커용 여백)까지 더해 헤더 아래로 떨어지므로 직접 계산한다
    const headerHeight =
      parseFloat(getComputedStyle(root).scrollMarginTop) || 0;
    const top = root.getBoundingClientRect().top;
    if (top < headerHeight) {
      window.scrollTo({ top: top + window.scrollY - headerHeight });
    }
  }, [moves]);

  if (moves.length === 0) {
    return <MoveEmpty />;
  }

  return (
    <div ref={rootRef} className="scroll-mt-(--header-height)">
      {/* 보이는 쪽만 그린다. 서버·hydration('both')에선 둘 다 그리고 CSS로 나눈다 */}
      {layout !== 'cards' && (
        <section className="hidden w-full lg:block">
          <MoveTable moves={moves} />
        </section>
      )}
      {layout !== 'table' && (
        <section className="-mt-2 lg:hidden">
          <MoveCards moves={moves} />
        </section>
      )}
    </div>
  );
}
