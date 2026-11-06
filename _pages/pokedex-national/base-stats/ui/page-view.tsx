'use client';
import { useRef } from 'react';

import { PaginationNav } from '@/_shared/ui/pagination';
import ScrollToTopButton from '@/_shared/ui/scroll-to-top-button';

import type { BaseStatsPoke } from '../model/poke';
import { usePokeResults } from '../model/poke-results';
import PokedexTable from './pokedex-table';
import { useSortParam } from '../model/sort';
import PokedexCardList from './pokedex-card-list';
import PokedexFilter from './filter-group';
import ResultEmpty from './result-empty';
import ResultCount from './result-count';
import Sort from './sort';
import { useReloadScrollRestoration } from '../lib/use-reload-scroll-restoration';
import { useScrollToResultsTop } from '../lib/use-scroll-to-results-top';

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
    <div className="flex flex-col gap-3 lg:gap-3">
      <ScrollToTopButton />
      <PokedexFilter resultCount={totalCount} />
      <section
        ref={sectionRef}
        className="flex flex-col gap-6 w-full scroll-mt-(--header-height)"
      >
        {/* 결과 줄 (lg 미만): 개수 + 정렬. lg 이상은 개수를 툴바 끝에, 정렬은 표 머리글로 한다 */}
        <div className="flex min-h-8 items-center justify-between gap-3 lg:hidden">
          <ResultCount count={totalCount} />
          <Sort sortState={sortState} onToggle={toggleSort} />
        </div>

        {totalCount === 0 ? (
          <ResultEmpty />
        ) : (
          <>
            <div className="lg:hidden">
              <PokedexCardList pokes={pagePokes} />
            </div>
            <div className="hidden lg:block">
              <PokedexTable
                pokes={pagePokes}
                sortState={sortState}
                onSort={toggleSort}
              />
            </div>
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
