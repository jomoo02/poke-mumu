'use client';

import type { Type } from '@/_entities/type';

import PokeToolbar from './toolbar';
import PokeResults from './results';
import type { BaseStatsPoke } from '../model/base-stats-poke';
import { usePokeResults } from '../model/use-poke-results';

interface NationalBaseStatsViewProps {
  pokes: BaseStatsPoke[];
  // 필터 선택지 (게임 표시 순서로 정렬된 상태)
  types: Type[];
}

// 위: 툴바(검색·필터) / 아래: 결과(개수·정렬, 테이블·리스트, 페이지네이션)
export default function NationalBaseStatsView({
  pokes,
  types,
}: NationalBaseStatsViewProps) {
  const { pagePokes, page, totalPages, totalCount } = usePokeResults(pokes);

  return (
    <div className="flex flex-col gap-6">
      <PokeToolbar types={types} totalCount={totalCount} />
      <PokeResults
        pokes={pagePokes}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </div>
  );
}
