'use client';

import { useRef } from 'react';

import { PaginationNav } from '@/_shared/ui/pagination';
import ScrollToTopButton from '@/_shared/ui/scroll-to-top-button';

import { useReloadScrollRestoration } from '../lib/use-reload-scroll-restoration';
import { useScrollToResultsTop } from '../lib/use-scroll-to-results-top';
import type { BaseStatsPoke } from '../model/poke';
import { usePokeResults } from '../model/poke-results';
import { useSortParam } from '../model/sort';
import PokedexFilter from './filter-group';
import PokedexCardList from './pokedex-card-list';
import PokedexTable from './pokedex-table';
import ResultCount from './result-count';
import ResultEmpty from './result-empty';
import Sort from './sort';

interface PageViewProps {
  pokes: BaseStatsPoke[];
}

export default function PageView({ pokes }: PageViewProps) {
  const { sortState, toggleSort } = useSortParam();

  const { pagePokes, page, totalPages, totalCount } = usePokeResults(pokes);

  useReloadScrollRestoration();

  // 조건·페이지가 바뀌면 결과 위로 올린다
  const sectionRef = useRef<HTMLElement>(null);

  useScrollToResultsTop(pagePokes, sectionRef);

  return (
    <>
      <ScrollToTopButton />
      <div className="flex flex-col lg:gap-2">
        <PokedexFilter resultCount={totalCount} />
        <section
          ref={sectionRef}
          className="flex flex-col gap-y-3 w-full scroll-mt-(--header-height)"
        >
          {/* 결과 줄 (lg 미만): 개수 + 정렬. lg 이상은 개수를 툴바 끝에, 정렬은 표 머리글로 한다 */}
          <div className="flex min-h-8 items-center justify-between gap-3 lg:hidden">
            <ResultCount count={totalCount} />
            <Sort sortState={sortState} onToggle={toggleSort} />
          </div>

          {/* 결과가 없으면 카드 목록은 안내로 바꾸고, 표는 머리글을 남긴 채 본문에 안내를 보인다 */}
          <div className="lg:hidden">
            {totalCount === 0 ? (
              <ResultEmpty />
            ) : (
              <PokedexCardList pokes={pagePokes} />
            )}
          </div>
          <div className="hidden lg:block">
            <PokedexTable
              pokes={pagePokes}
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
