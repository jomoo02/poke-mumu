'use client';

import type { Type } from '@/_entities/type';
// 정리 전까지 전국도감 종족값의 툴바·빈 상태를 그대로 쓴다
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import PokeToolbar from '@/_pages/pokedex/national-base-stats/ui/toolbar';
import PokeEmpty from '@/_pages/pokedex/national-base-stats/ui/results/poke-empty';

import ResultsHeader from './results-header';
import FullStatTable from './stat-table/full-stat-table';
import VirtualStatTable from './stat-table/virtual-stat-table';
import { useAllPokeResults } from '../model/use-all-poke-results';
import { useListMode } from '../model/use-list-mode';

interface NationalBaseStatsV4ViewProps {
  pokes: BaseStatsPoke[];
  // 필터 선택지 (게임 표시 순서로 정렬된 상태)
  types: Type[];
}

// 위: 툴바(검색·필터) / 아래: 결과(개수, 테이블). 페이지네이션 없음
export default function NationalBaseStatsV4View({
  pokes,
  types,
}: NationalBaseStatsV4ViewProps) {
  const {
    pokes: resultPokes,
    sortState,
    shownSortState,
    isPending,
    toggleSort,
  } = useAllPokeResults(pokes);

  const totalCount = resultPokes.length;

  const listMode = useListMode();

  const StatTable = listMode === 'virtual' ? VirtualStatTable : FullStatTable;

  return (
    <div className="flex flex-col gap-6">
      <PokeToolbar types={types} totalCount={totalCount} />
      {/* 10열이라 화면 폭이 아닌 본문 폭(@5xl)으로 테이블·2줄 행을 나눈다 */}
      <section className="@container flex w-full flex-col gap-4">
        <ResultsHeader totalCount={totalCount} />
        {totalCount === 0 ? (
          <PokeEmpty />
        ) : (
          <StatTable
            pokes={resultPokes}
            sortState={sortState}
            shownSortState={shownSortState}
            isPending={isPending}
            onSort={toggleSort}
          />
        )}
      </section>
    </div>
  );
}
