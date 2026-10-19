'use client';

import type { Type } from '@/_entities/type';
// 비교용 테스트 페이지라 전국도감 종족값의 툴바·결과 머리·빈 상태를 그대로 쓴다
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import PokeToolbar from '@/_pages/pokedex/national-base-stats/ui/toolbar';
import PokeResultsHeader from '@/_pages/pokedex/national-base-stats/ui/results/results-header';
import PokeEmpty from '@/_pages/pokedex/national-base-stats/ui/results/poke-empty';

import VirtualPokeTable from './virtual-poke-table';
import { useAllPokeResults } from '../model/use-all-poke-results';

interface NationalBaseStatsV2ViewProps {
  pokes: BaseStatsPoke[];
  // 필터 선택지 (게임 표시 순서로 정렬된 상태)
  types: Type[];
}

// 위: 툴바(검색·필터) / 아래: 결과(개수·정렬, 가상화 테이블). 페이지네이션 없음
export default function NationalBaseStatsV2View({
  pokes,
  types,
}: NationalBaseStatsV2ViewProps) {
  const {
    pokes: resultPokes,
    sortState,
    toggleSort,
  } = useAllPokeResults(pokes);

  const totalCount = resultPokes.length;

  return (
    <div className="flex flex-col gap-6">
      <PokeToolbar types={types} totalCount={totalCount} />
      <PokeResultsHeader totalCount={totalCount} />
      {totalCount === 0 ? (
        <PokeEmpty />
      ) : (
        // 10열이라 기존처럼 화면 폭이 아닌 본문 폭으로 레이아웃을 나눈다
        <section className="@container w-full">
          <VirtualPokeTable
            pokes={resultPokes}
            sortState={sortState}
            onSort={toggleSort}
          />
        </section>
      )}
    </div>
  );
}
