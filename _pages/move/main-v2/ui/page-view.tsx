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
import ResultEmpty from './result-empty';
import Sort from './sort';
import { Toolbar } from './toolbar';

interface PageViewProps {
  moves: ListMove[];
}

export default function PageView({ moves }: PageViewProps) {
  const { sortState, toggleSort, selectKey, selectOrder } = useSortParam();

  const { pageMoves, page, totalPages, totalCount, filterCounts } =
    useMoveResults(moves);

  useReloadScrollRestoration();

  // 조건·페이지가 바뀌면 결과 위로 올린다
  const sectionRef = useRef<HTMLElement>(null);

  useScrollToResultsTop(pageMoves, sectionRef);

  return (
    <>
      {/* 모바일에도 띄운다 (목록 끝 여백은 index.tsx의 pb-20) */}
      <ScrollToTopButton className="flex" />
      <div className="flex flex-col gap-y-2">
        <section
          ref={sectionRef}
          // 툴바 → 콘텐츠(카드·표) sm 미만 16px, sm 이상 24px
          className="flex flex-col w-full scroll-mt-(--header-height) gap-y-4 sm:gap-y-6"
        >
          {/* 검색 + 필터, 고른 칩, 결과 수 + 정렬 (정렬은 lg 미만만) */}
          <Toolbar
            resultCount={totalCount}
            filterCounts={filterCounts}
            sort={
              <Sort
                sortState={sortState}
                onSelectKey={selectKey}
                onSelectOrder={selectOrder}
              />
            }
          />
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
          {/* 목록 아래: 페이지 이동 (결과 수는 툴바에만) */}
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
