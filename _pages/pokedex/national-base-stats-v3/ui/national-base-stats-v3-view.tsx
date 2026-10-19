'use client';

import type { Type } from '@/_entities/type';
// 비교용 페이지라 전국도감 종족값의 툴바·결과 머리·빈 상태를 그대로 쓴다
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import PokeToolbar from '@/_pages/pokedex/national-base-stats/ui/toolbar';
import PokeResultsHeader from '@/_pages/pokedex/national-base-stats/ui/results/results-header';
import PokeEmpty from '@/_pages/pokedex/national-base-stats/ui/results/poke-empty';

import VirtualStatTable from './virtual-stat-table';
import LazyStatTable from './virtual-stat-table/lazy-stat-table';
import SortUiSwitch from './sort-ui-switch';
import ListModeSwitch from './list-mode-switch';
import ModeResultsHeader from './mode-results-header';
import RadioResultsHeader from './radio-results-header';
import { useAllPokeResults } from '../model/use-all-poke-results';
import { isSortSheetUi, useSortUi, usesColumnHead } from '../model/use-sort-ui';
import { useModeSort } from '../model/use-mode-sort';
import { useListMode } from '../model/use-list-mode';

interface NationalBaseStatsV3ViewProps {
  pokes: BaseStatsPoke[];
  // 필터 선택지 (게임 표시 순서로 정렬된 상태)
  types: Type[];
}

// 위: 툴바(검색·필터) / 아래: 결과(개수·정렬, 테이블). 페이지네이션 없음.
// 테이블은 비교용으로 가상화·content-visibility 중 하나 (?list=)
export default function NationalBaseStatsV3View({
  pokes,
  types,
}: NationalBaseStatsV3ViewProps) {
  const {
    pokes: resultPokes,
    sortState,
    toggleSort,
  } = useAllPokeResults(pokes);

  const totalCount = resultPokes.length;

  const { sortUi, setSortUi } = useSortUi();

  const { isStatSort } = useModeSort();

  const { listMode, setListMode } = useListMode();

  const StatTable = listMode === 'lazy' ? LazyStatTable : VirtualStatTable;

  return (
    <div className="flex flex-col gap-6">
      <PokeToolbar types={types} totalCount={totalCount} />
      {/* 정렬 시트(radio·분리형·표형): 머리글 없이 정렬 버튼의 시트로 고른다. 7칸 머리글 UI: 정렬 메뉴는 도감번호·이름(방향 포함)·능력치순 5개.
          칩 바: 기존 정렬 메뉴 */}
      {isSortSheetUi(sortUi) ? (
        <RadioResultsHeader totalCount={totalCount} sheet={sortUi} />
      ) : usesColumnHead(sortUi) ? (
        <ModeResultsHeader totalCount={totalCount} />
      ) : (
        <PokeResultsHeader totalCount={totalCount} />
      )}
      <div className="flex flex-col gap-2">
        <SortUiSwitch value={sortUi} onChange={setSortUi} />
        <ListModeSwitch value={listMode} onChange={setListMode} />
      </div>
      {totalCount === 0 ? (
        <PokeEmpty />
      ) : (
        // 10열이라 기존처럼 화면 폭이 아닌 본문 폭으로 레이아웃을 나눈다
        <section className="@container w-full">
          <StatTable
            pokes={resultPokes}
            sortUi={sortUi}
            isStatSort={isStatSort}
            sortState={sortState}
            onSort={toggleSort}
          />
        </section>
      )}
    </div>
  );
}
