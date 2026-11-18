'use client';

import { useSearchParamsState } from '../search-params';
import { DEFAULT_SORT_KEY, SORT_OPTIONS } from '.';

export function usePokeSort() {
  const { searchParams, setParams } = useSearchParamsState();

  const sortState = searchParams.get('sort');

  const curSort = sortState || DEFAULT_SORT_KEY;

  const changeSortKey = (nextKey: string) => {
    const option = SORT_OPTIONS.find((candidate) => candidate.key === nextKey);
    if (!option) return;
    setParams({ sort: nextKey === DEFAULT_SORT_KEY ? null : nextKey });
  };

  const resetSort = () => setParams({ sort: null });

  const isActive = sortState && sortState !== DEFAULT_SORT_KEY;

  return {
    isActive,
    changeSortKey,
    resetSort,
    sort: curSort,
  };
}
