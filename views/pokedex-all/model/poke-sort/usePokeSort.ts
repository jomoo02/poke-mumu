'use client';

import { useSearchParamsState } from '../search-params';
import { DEFAULT_SORT_DIR, DEFAULT_SORT_KEY, SORT_OPTIONS } from './config';
import { parseSort } from './sort';
import { type SortDir } from './config';

export function usePokeSort() {
  const { searchParams, setParams } = useSearchParamsState();

  const { sortKey, sortDir } = parseSort(searchParams);

  const changeSortKey = (nextKey: string) => {
    const option = SORT_OPTIONS.find((candidate) => candidate.key === nextKey);
    if (!option) return;
    setParams({ sort: nextKey === DEFAULT_SORT_KEY ? null : nextKey });
  };

  const changeSortDir = (nextDir: SortDir) =>
    setParams({ dir: nextDir === DEFAULT_SORT_DIR ? null : nextDir });

  const resetSort = () => setParams({ sort: null, dir: null });

  const isActive = sortKey !== DEFAULT_SORT_KEY || sortDir !== DEFAULT_SORT_DIR;

  return {
    sortKey,
    sortDir,
    isActive,
    changeSortKey,
    changeSortDir,
    resetSort,
  };
}
