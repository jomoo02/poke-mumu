'use client';

import { useRef } from 'react';

import { PaginationNav } from '@/_shared/ui/pagination';
import ScrollToTopButton from '@/_shared/ui/scroll-to-top-button';

import { useReloadScrollRestoration } from '../lib/use-reload-scroll-restoration';
import { useScrollToResultsTop } from '../lib/use-scroll-to-results-top';
import type { ListMove } from '../model/move';
import { useMoveResults } from '../model/move-results';
import { useSortParam } from '../model/sort';
import MoveList from './move-list';
import MoveTable from './move-table';
import ResultCount from './result-count';
import ResultEmpty from './result-empty';
import Sort from './sort';
import Toolbar from './toolbar';

interface PageViewProps {
  moves: ListMove[];
}

export default function PageView({ moves }: PageViewProps) {
  const { sortState, toggleSort, selectKey, selectOrder } = useSortParam();

  const { pageMoves, page, totalPages, totalCount, scopeCount, filterCounts } =
    useMoveResults(moves);

  useReloadScrollRestoration();

  // 조건·페이지가 바뀌면 결과 위로 올린다
  const sectionRef = useRef<HTMLElement>(null);

  useScrollToResultsTop(pageMoves, sectionRef);

  return (
    <>
      <ScrollToTopButton />
      <div className="flex flex-col lg:gap-6">
        <Toolbar
          resultCount={totalCount}
          scopeCount={scopeCount}
          filterCounts={filterCounts}
        />
        <section
          ref={sectionRef}
          className="flex flex-col gap-y-3 w-full scroll-mt-(--header-height)"
        >
          <ResultCount count={totalCount} />
          {/* 결과 줄 (lg 미만): 정렬. lg 이상은 표 머리글로 한다 */}
          <div className="mt-3 flex min-h-8 items-center justify-end lg:hidden">
            <Sort
              sortState={sortState}
              onSelectKey={selectKey}
              onSelectOrder={selectOrder}
            />
          </div>

          {/* 결과가 없으면 카드 목록은 안내로 바꾸고, 표는 머리글을 남긴 채 본문에 안내를 보인다 */}
          <div className="lg:hidden">
            {totalCount === 0 ? (
              <ResultEmpty />
            ) : (
              <MoveList moves={pageMoves} />
            )}
          </div>
          <div className="hidden lg:block">
            <MoveTable
              moves={pageMoves}
              sortState={sortState}
              onSort={toggleSort}
              empty={<ResultEmpty />}
            />
          </div>
          {totalCount > 0 && (
            <PaginationNav
              page={page}
              totalPages={totalPages}
              className="mt-3"
            />
          )}
        </section>
      </div>
    </>
  );
}
