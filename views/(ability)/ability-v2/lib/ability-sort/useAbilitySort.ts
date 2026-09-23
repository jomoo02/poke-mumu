'use client';

import { useMemo } from 'react';

import {
  useSearchParamsState,
  useSingleParam,
} from '@/shared/lib/search-params';

import type { AbilitySort, SortDirection, SortKey } from './sort';

import {
  DEFAULT_SORT,
  SORT_KEYS,
  SORT_DIRECTIONS,
  isSameSort,
  RESET_KEYS,
} from './sort';

export function useAbilitySort() {
  const { value: sortKey } = useSingleParam<SortKey>('sort', {
    defaultValue: DEFAULT_SORT.sort,
    validValues: SORT_KEYS,
    resetKeys: RESET_KEYS,
  });

  const { value: sortDir } = useSingleParam<SortDirection>('dir', {
    defaultValue: DEFAULT_SORT.dir,
    validValues: SORT_DIRECTIONS,
    resetKeys: RESET_KEYS,
  });

  const { setParams } = useSearchParamsState({ resetKeys: RESET_KEYS });

  const sort = useMemo<AbilitySort>(
    () => ({ sort: sortKey, dir: sortDir }),
    [sortKey, sortDir],
  );

  const setSort = (next: AbilitySort) => {
    // 같은 정렬을 다시 고르면 page도 유지한다
    if (isSameSort(next, sort)) {
      return;
    }

    setParams({
      sort: next.sort === DEFAULT_SORT.sort ? null : next.sort,
      dir: next.dir === DEFAULT_SORT.dir ? null : next.dir,
    });
  };

  const toggleSort = (nextKey: SortKey) => {
    if (nextKey === sort.sort) {
      setSort({
        sort: nextKey,
        dir: sort.dir === 'asc' ? 'desc' : 'asc',
      });
      return;
    }
    setSort({ sort: nextKey, dir: 'asc' });
  };

  return {
    sort,
    setSort,
    toggleSort,
  };
}
