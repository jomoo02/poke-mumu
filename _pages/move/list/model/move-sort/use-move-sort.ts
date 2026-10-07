'use client';

import { useMemo } from 'react';

import {
  useSearchParamsState,
  useSingleParam,
} from '@/_shared/lib/search-params';

import {
  DEFAULT_SORT,
  SORT_KEYS,
  SORT_ORDERS,
  isSameSort,
  type MoveSort,
  type SortKey,
  type SortOrder,
} from './sort';
import { getInitialOrder } from './sort-option';
import { PAGE_RESET_KEYS, SEARCH_PARAMS_KEY } from '../../config/search-params';

export function useMoveSort() {
  // 읽기 전용(value만 사용). 쓰기는 아래 setParams 한 곳에서 sort·order를 함께 처리한다
  const { value: sort } = useSingleParam<SortKey>(SEARCH_PARAMS_KEY.sort, {
    defaultValue: DEFAULT_SORT.sort,
    validValues: SORT_KEYS,
  });

  const { value: order } = useSingleParam<SortOrder>(SEARCH_PARAMS_KEY.order, {
    defaultValue: DEFAULT_SORT.order,
    validValues: SORT_ORDERS,
  });

  const { setParams } = useSearchParamsState({ resetKeys: PAGE_RESET_KEYS });

  const sortState = useMemo<MoveSort>(() => ({ sort, order }), [sort, order]);

  const setSort = (next: MoveSort) => {
    // 같은 정렬을 다시 고르면 page도 유지한다
    if (isSameSort(next, sortState)) {
      return;
    }

    setParams({
      [SEARCH_PARAMS_KEY.sort]:
        next.sort === DEFAULT_SORT.sort ? null : next.sort,
      [SEARCH_PARAMS_KEY.order]:
        next.order === DEFAULT_SORT.order ? null : next.order,
    });
  };

  // 테이블 헤더: 같은 기준이면 방향 반전, 다른 기준이면 그 기준의 첫 방향부터
  const toggleSort = (nextKey: SortKey) => {
    if (nextKey === sortState.sort) {
      setSort({
        sort: nextKey,
        order: sortState.order === 'asc' ? 'desc' : 'asc',
      });
      return;
    }
    setSort({ sort: nextKey, order: getInitialOrder(nextKey) });
  };

  // 정렬 메뉴 기준 칸: 다른 기준이면 그 기준의 첫 방향부터, 같은 기준이면 그대로
  const selectKey = (nextKey: SortKey) => {
    setSort({
      sort: nextKey,
      order:
        nextKey === sortState.sort ? sortState.order : getInitialOrder(nextKey),
    });
  };

  // 정렬 메뉴 방향 칸: 기준은 두고 방향만 반전
  const toggleOrder = () => {
    setSort({
      sort: sortState.sort,
      order: sortState.order === 'asc' ? 'desc' : 'asc',
    });
  };

  return {
    sortState,
    toggleSort,
    selectKey,
    toggleOrder,
  };
}
