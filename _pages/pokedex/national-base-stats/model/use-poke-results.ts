'use client';

import { useMemo } from 'react';

import { PAGE_SIZE } from '../config/national-base-stats';
import type { BaseStatsPoke } from './base-stats-poke';
import type { PokeFilterOptions } from './filter';
import { deriveResults } from './results';
import {
  useFilterParams,
  useKeywordParam,
  useLanguageParam,
  usePageParam,
  useSortParams,
} from './url-state';

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

  return useMemo(
    () =>
      deriveResults(
        pokes,
        { keyword, filter, sortState, language, page },
        PAGE_SIZE,
      ),
    [pokes, keyword, filter, sortState, language, page],
  );
}
