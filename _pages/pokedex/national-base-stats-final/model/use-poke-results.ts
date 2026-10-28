import { useMemo } from 'react';

import { paginate } from '@/_shared/lib/pagination';

import { PAGE_SIZE } from '../config';
import type { BaseStatsPoke } from './base-stats-poke';
import { filterPokes, type PokeFilterOptions } from './filter';
// import { deriveResults } from './results';
import {
  usePageParam,
  useFilterParams,
  useKeywordParam,
  useLanguageParam,
  useSortParams,
} from './url-state';
import { sortPokes } from './sort';
import {
  countMatchesInOtherLanguages,
  filterPokesByKeyword,
} from '../model/search';

// 지금 URL 조건의 결과 (계산은 순수 함수 deriveResults)
export function usePokeResults(
  pokes: BaseStatsPoke[],
  options: PokeFilterOptions,
) {
  const { keyword } = useKeywordParam();
  const { filter } = useFilterParams(options);
  const { sortState } = useSortParams();
  const { language } = useLanguageParam();
  const { page } = usePageParam();

  const filtered = filterPokes(pokes, filter);
  const searched = filterPokesByKeyword(filtered, keyword, language);
  const sorted = sortPokes(searched, sortState, language);

  const {
    items,
    page: shownPage,
    totalPages,
  } = paginate(sorted, page, PAGE_SIZE);

  const otherLanguageMatches =
    sorted.length === 0
      ? countMatchesInOtherLanguages(filtered, keyword, language)
      : [];

  return useMemo(
    () => ({
      otherLanguageMatches,
      pagePokes: items,
      page: shownPage,
      totalPages,
      totalCount: sorted.length,
    }),
    [items, sorted, shownPage, totalPages, page, otherLanguageMatches],
  );

  // return useMemo(
  //   () =>
  //     deriveResults(
  //       pokes,
  //       { keyword, filter, sortState, language, page },
  //       PAGE_SIZE,
  //     ),
  //   [pokes, keyword, filter, sortState, language, page],
  // );
}
