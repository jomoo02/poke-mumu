'use client';

import { useRef } from 'react';

import { PaginationNav } from '@/_shared/ui/pagination';

import type { BaseStatsPoke } from '../model/base-stats-poke';
import type { PokeFilterOptions } from '../model/filter';
import { useLanguageParam, useSortParams } from '../model/url-state';
import { usePokeResults } from '../model/use-poke-results';
import { useReloadScrollRestoration } from '../lib/use-reload-scroll-restoration';
import { useScrollToResultsTop } from '../lib/use-scroll-to-results-top';

import PokeToolbar from './toolbar';
import ResultsEmpty from './results/results-empty';
import ResultsHeader from './results/results-header';
import SortControl from './sort-control';
import StatCards from './stat-cards';
import StatTable from './stat-table';

interface NationalBaseStatsViewProps {
  pokes: BaseStatsPoke[];
  // 필터 선택지 (서버에서 출처별로 모은 같은 모양. 화면 순서)
  filterOptions: PokeFilterOptions;
}

// 위: 툴바(검색, 이름 언어·필터) / 아래: 결과(개수 ↔ 정렬, 표 또는 카드, 페이지)
export default function NationalBaseStatsView({
  pokes,
  filterOptions,
}: NationalBaseStatsViewProps) {
  const { sortState, toggleSort, selectSortKey, selectSortOrder } =
    useSortParams();

  const { language } = useLanguageParam();

  const { pagePokes, page, totalPages, totalCount, otherLanguageMatches } =
    usePokeResults(pokes, filterOptions);

  useReloadScrollRestoration();

  // 조건·페이지가 바뀌면 결과 위로 올린다
  const sectionRef = useRef<HTMLElement>(null);

  useScrollToResultsTop(pagePokes, sectionRef);

  return (
    // view 컨테이너: 툴바가 본문 폭으로 한 줄(넓은 본문)·두 줄(좁은 본문)을 고른다
    <div className="@container/view flex flex-col gap-3">
      <PokeToolbar filterOptions={filterOptions} resultCount={totalCount} />
      {/* 10열이라 화면 폭이 아닌 본문 폭(@5xl)으로 표·카드를 나눈다 */}
      <section
        ref={sectionRef}
        className="@container flex w-full scroll-mt-(--header-height) flex-col gap-4"
      >
        {/* 넓은 본문은 개수가 툴바 줄 끝에 있고 정렬은 머리글이라 결과 줄을 숨긴다 */}
        <ResultsHeader totalCount={totalCount} className="@5xl/view:hidden">
          {/* md 미만은 시트, 이상은 팝오버 */}
          <SortControl
            sortState={sortState}
            onSelectKey={selectSortKey}
            onSelectOrder={selectSortOrder}
          />
        </ResultsHeader>
        {totalCount === 0 ? (
          <ResultsEmpty
            filterOptions={filterOptions}
            otherLanguageMatches={otherLanguageMatches}
          />
        ) : (
          <>
            {/* 둘 다 그리고 본문 폭으로 하나만 보인다 (한 페이지 70개라 부담이 작고, JS 폭 판정의 첫 렌더 깜빡임이 없다) */}
            <div className="hidden @5xl:block">
              <StatTable
                pokes={pagePokes}
                sortState={sortState}
                language={language}
                onSort={toggleSort}
              />
            </div>
            <div className="@5xl:hidden">
              <StatCards
                pokes={pagePokes}
                sortState={sortState}
                language={language}
              />
            </div>
            {/* 1페이지뿐이어도 표시한다. 검색 중 결과 수가 바뀔 때 레이아웃이 흔들리지 않게 */}
            <PaginationNav
              page={page}
              totalPages={totalPages}
              className="mt-3"
            />
          </>
        )}
      </section>
    </div>
  );
}
