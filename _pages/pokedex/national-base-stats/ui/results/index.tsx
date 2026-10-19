'use client';

import { PaginationNav } from '@/_shared/ui/pagination';

import type { BaseStatsPoke } from '../../model/base-stats-poke';
import PokeResultsHeader from './results-header';
import PokeEmpty from './poke-empty';
import PokeTable from './poke-table';
import PokeList from './poke-list';

interface PokeResultsProps {
  // 현재 페이지의 포켓몬
  pokes: BaseStatsPoke[];
  page: number;
  totalPages: number;
  totalCount: number;
}

// 부모(flex-col gap-6)의 간격을 그대로 쓰도록 Fragment로 늘어놓는다.
// 테이블은 10열이라 화면 폭이 아닌 본문 폭(@container)으로 나눈다:
// 사이드바 유무와 관계없이 본문이 테이블 최소 폭(약 1004px)보다 넓을 때만(@5xl, 1024px) 테이블
export default function PokeResults({
  pokes,
  page,
  totalPages,
  totalCount,
}: PokeResultsProps) {
  return (
    <>
      <PokeResultsHeader totalCount={totalCount} />

      {totalCount === 0 ? (
        <PokeEmpty />
      ) : (
        <>
          <div className="@container">
            <section className="hidden w-full @5xl:block">
              <PokeTable pokes={pokes} />
            </section>
            <section className="-mt-2 @5xl:hidden">
              <PokeList pokes={pokes} />
            </section>
          </div>
          {/* 1페이지뿐이어도 표시한다. 검색 중 결과 수가 바뀔 때 레이아웃이 흔들리지 않게 */}
          <PaginationNav page={page} totalPages={totalPages} className="mt-3" />
        </>
      )}
    </>
  );
}
