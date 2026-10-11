'use client';

import { PaginationNav } from '@/_shared/ui/pagination';
import type { AbilityDetail } from '@/_entities/ability';

import AbilityResultsHeader from './results-header';
import AbilityEmpty from './ability-empty';
import AbilityTable from './ability-table';
import AbilityCards from './ability-cards';

interface AbilityResultsProps {
  // 현재 페이지의 특성
  abilities: AbilityDetail[];
  page: number;
  totalPages: number;
  totalCount: number;
}

// 부모(flex-col gap-6)의 간격을 그대로 쓰도록 Fragment로 늘어놓는다
export default function AbilityResults({
  abilities,
  page,
  totalPages,
  totalCount,
}: AbilityResultsProps) {
  return (
    <>
      <AbilityResultsHeader totalCount={totalCount} />

      {totalCount === 0 ? (
        <AbilityEmpty />
      ) : (
        <>
          <section className="lg:block hidden w-full">
            <AbilityTable abilities={abilities} />
          </section>
          <section className="lg:hidden -mt-2">
            <AbilityCards abilities={abilities} />
          </section>
          {/* 1페이지뿐이어도 표시한다. 검색 중 결과 수가 바뀔 때 레이아웃이 흔들리지 않게 */}
          <PaginationNav page={page} totalPages={totalPages} className="mt-3" />
        </>
      )}
    </>
  );
}
