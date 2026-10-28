'use client';

import { PaginationNav } from '@/_shared/ui/pagination';
import { PokeFilterOptions } from '../../national-base-stats/model/filter';
import type { BaseStatsPoke } from '../model/base-stats-poke';
import { usePokeResults } from '../model/use-poke-results';
import PokedexTable from './pokedex-table';
import { useLanguageParam, useSortParams } from '../model/url-state';
import PokedexCardList from './pokedex-card-list';
import PokedexFilter from './pokedex-filter';
import ResultsEmpty from './pokedex-empty';
import ResultCount from './result-count';
import SortControl from './sort-control';

interface PageViewProps {
  pokes: BaseStatsPoke[];
  // 필터 선택지 (서버에서 출처별로 모은 같은 모양. 화면 순서)
  filterOptions: PokeFilterOptions;
}

export default function PageView({ pokes, filterOptions }: PageViewProps) {
  const { language } = useLanguageParam();
  const { sortState, toggleSort, selectSortKey, selectSortOrder } =
    useSortParams();

  const { pagePokes, page, totalPages, totalCount, otherLanguageMatches } =
    usePokeResults(pokes, filterOptions);

  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      {/* controller */}
      <PokedexFilter filterOptions={filterOptions} resultCount={totalCount} />

      <div className="min-h-8 items-center justify-between gap-3 flex lg:hidden">
        <ResultCount count={totalCount} />
        <SortControl
          sortState={sortState}
          onSelectKey={selectSortKey}
          onSelectOrder={selectSortOrder}
        />
      </div>

      {totalCount === 0 ? (
        <ResultsEmpty
          filterOptions={filterOptions}
          otherLanguageMatches={otherLanguageMatches}
        />
      ) : (
        <>
          <div className="lg:hidden">
            <PokedexCardList
              pokes={pagePokes}
              sortState={sortState}
              language={language}
            />
          </div>
          <div className="hidden lg:block">
            <PokedexTable
              pokes={pagePokes}
              sortState={sortState}
              language={language}
              onSort={toggleSort}
            />
          </div>
          <PaginationNav page={page} totalPages={totalPages} className="mt-3" />
        </>
      )}
    </div>
  );
}
