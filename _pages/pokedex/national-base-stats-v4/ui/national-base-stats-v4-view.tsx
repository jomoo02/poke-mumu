'use client';

import { useRef } from 'react';

import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { PokeFilterOptions } from '@/_pages/pokedex/national-base-stats/model/poke-filter';

import PokeToolbar from '@/_pages/pokedex/national-base-stats/ui/toolbar';
import ResultsEmpty from './results-empty';
import ResultsHeader from '@/_pages/pokedex/national-base-stats/ui/results/results-header';
import SortControl from '@/_pages/pokedex/national-base-stats/ui/sort-control';
import FullStatTable from './stat-table/full-stat-table';
import VirtualStatTable from './stat-table/virtual-stat-table';
import { useAllPokeResults } from '../model/use-all-poke-results';
import { useIsWideContainer } from '@/_pages/pokedex/national-base-stats/lib/use-is-wide-container';
import { useListMode } from '../model/use-list-mode';
import { useReloadScrollRestoration } from '@/_pages/pokedex/national-base-stats/lib/use-reload-scroll-restoration';

interface NationalBaseStatsV4ViewProps {
  pokes: BaseStatsPoke[];
  // 필터 선택지 (서버에서 출처별로 모은 같은 모양. 화면 순서)
  filterOptions: PokeFilterOptions;
}

// 위: 툴바(이름 언어·검색, 필터) / 아래: 결과(개수 ↔ 정렬, 테이블). 페이지네이션 없음
export default function NationalBaseStatsV4View({
  pokes,
  filterOptions,
}: NationalBaseStatsV4ViewProps) {
  const {
    pokes: resultPokes,
    sortState,
    shownSortState,
    shownLanguage,
    isPending,
    toggleSort,
    selectKey,
    selectOrder,
    setLanguage,
    otherLanguageMatches,
  } = useAllPokeResults(pokes, filterOptions);

  const totalCount = resultPokes.length;

  const listMode = useListMode();

  useReloadScrollRestoration();

  // 본문(@container) 폭으로 그리기 방식을 고른다: 테이블(넓은 본문)은 전부, 카드(좁은 본문)는 가상화
  const sectionRef = useRef<HTMLElement>(null);

  const isWide = useIsWideContainer(sectionRef);

  const isFullList = listMode === 'auto' ? isWide : listMode === 'full';

  const StatTable = isFullList ? FullStatTable : VirtualStatTable;

  return (
    <div className="flex flex-col gap-6">
      <PokeToolbar filterOptions={filterOptions} resultCount={totalCount} />
      {/* 10열이라 화면 폭이 아닌 본문 폭(@5xl)으로 테이블·2줄 행을 나눈다 */}
      <section
        ref={sectionRef}
        className="@container flex w-full flex-col gap-4"
      >
        <ResultsHeader totalCount={totalCount}>
          {/* 넓은 본문(@5xl)은 테이블 머리글로 정렬해 숨긴다. md 미만은 시트, 이상은 팝오버 */}
          <SortControl
            sortState={sortState}
            onSelectKey={selectKey}
            onSelectOrder={selectOrder}
            className="@5xl:hidden"
          />
        </ResultsHeader>
        {totalCount === 0 ? (
          <ResultsEmpty
            filterOptions={filterOptions}
            otherLanguageMatches={otherLanguageMatches}
            onLanguageChange={setLanguage}
          />
        ) : (
          <StatTable
            pokes={resultPokes}
            sortState={sortState}
            shownSortState={shownSortState}
            language={shownLanguage}
            isPending={isPending}
            onSort={toggleSort}
          />
        )}
      </section>
    </div>
  );
}
