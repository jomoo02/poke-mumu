'use client';

import { PaginationNav } from '@/_shared/ui/pagination';
import type { Move } from '@/_entities/move';

import MoveResultsHeader from './results-header';
import MoveEmpty from './move-empty';
import MoveTable from './move-table';
import MoveCards from './move-cards';

interface MoveResultsProps {
  // 현재 페이지의 기술
  moves: Move[];
  page: number;
  totalPages: number;
  totalCount: number;
}

// 부모(flex-col gap-6)의 간격을 그대로 쓰도록 Fragment로 늘어놓는다
export default function MoveResults({
  moves,
  page,
  totalPages,
  totalCount,
}: MoveResultsProps) {
  return (
    <>
      <MoveResultsHeader totalCount={totalCount} />

      {totalCount === 0 ? (
        <MoveEmpty />
      ) : (
        <>
          <section className="lg:block hidden w-full">
            <MoveTable moves={moves} />
          </section>
          <section className="lg:hidden -mt-2">
            <MoveCards moves={moves} />
          </section>
          {/* 1페이지뿐이어도 표시한다. 검색 중 결과 수가 바뀔 때 레이아웃이 흔들리지 않게 */}
          <PaginationNav page={page} totalPages={totalPages} className="mt-3" />
        </>
      )}
    </>
  );
}
