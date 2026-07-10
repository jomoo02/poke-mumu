'use client';

import { useSearchParamsState } from '../search-params';
import { DEFAULT_SORT_DIR, DEFAULT_SORT_KEY, SORT_OPTIONS } from './config';
import { parseSort } from './sort';
import { type SortDir } from './config';

export function usePokeSort() {
  const { searchParams, setParams } = useSearchParamsState();

  const { key, dir } = parseSort(searchParams);

  // 키만 변경(방향 유지). 기본값이면 파라미터 제거로 정규화.
  const changeSortKey = (nextKey: string) => {
    const option = SORT_OPTIONS.find((candidate) => candidate.key === nextKey);
    if (!option) return;
    setParams({ sort: nextKey === DEFAULT_SORT_KEY ? null : nextKey });
  };

  // 방향만 변경(키와 독립). 기본값이면 파라미터 제거.
  const changeSortDir = (nextDir: SortDir) =>
    setParams({ dir: nextDir === DEFAULT_SORT_DIR ? null : nextDir });

  const resetSort = () => setParams({ sort: null, dir: null });

  const isActive = key !== DEFAULT_SORT_KEY || dir !== DEFAULT_SORT_DIR;

  return {
    key,
    dir,
    isActive,
    changeSortKey,
    changeSortDir,
    resetSort,
  };
}
