'use client';

import { useMemo } from 'react';

import {
  useSearchParamsState,
  useSingleParam,
} from '@/shared/lib/search-params';

import {
  DEFAULT_SORT,
  SORT_KEYS,
  SORT_ORDERS,
  isSameSort,
  type AbilitySort,
  type SortKey,
  type SortOrder,
} from './lib';

const RESET_KEYS = ['page'];

/**
 * 정렬 상태(URL `sort`, `order`). 기본값(name/asc)은 URL에 쓰지 않는다.
 * key와 order를 함께 바꾸는 경우가 있어 쓰기는 setParams 한 번으로 처리한다(replace 1회).
 */
export default function useAbilitySort() {
  const { value: key } = useSingleParam<SortKey>('sort', {
    defaultValue: DEFAULT_SORT.key,
    validValues: SORT_KEYS,
    resetKeys: RESET_KEYS,
  });

  const { value: order } = useSingleParam<SortOrder>('order', {
    defaultValue: DEFAULT_SORT.order,
    validValues: SORT_ORDERS,
    resetKeys: RESET_KEYS,
  });

  const { setParams } = useSearchParamsState({ resetKeys: RESET_KEYS });

  const sort = useMemo<AbilitySort>(() => ({ key, order }), [key, order]);

  const setSort = (next: AbilitySort) => {
    // 같은 정렬을 다시 고르면 page도 유지한다
    if (isSameSort(next, sort)) return;

    setParams({
      sort: next.key === DEFAULT_SORT.key ? null : next.key,
      order: next.order === DEFAULT_SORT.order ? null : next.order,
    });
  };

  // 열 헤더: 같은 열이면 방향 토글, 다른 열이면 오름차순부터
  const toggleSort = (nextKey: SortKey) => {
    if (nextKey === sort.key) {
      setSort({ key: nextKey, order: sort.order === 'asc' ? 'desc' : 'asc' });
      return;
    }
    setSort({ key: nextKey, order: 'asc' });
  };

  return { sort, setSort, toggleSort };
}
