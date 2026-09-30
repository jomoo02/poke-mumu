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

  const isActive = !isSameSort(sortState, DEFAULT_SORT);

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

  // 테이블 헤더용: 같은 컬럼이면 방향 반전, 다른 컬럼이면 그 기준의 첫 방향부터
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

  // 모바일 정렬 기준 라디오: 헤더와 같은 규칙으로 그 기준의 첫 방향부터.
  // 이미 고른 기준이면 방향을 유지한다
  const setSortKey = (nextKey: SortKey) => {
    if (nextKey === sortState.sort) {
      return;
    }
    setSort({ sort: nextKey, order: getInitialOrder(nextKey) });
  };

  // 모바일 방향 토글: 기준은 그대로 두고 방향만 뒤집는다
  const toggleOrder = () =>
    setSort({
      sort: sortState.sort,
      order: sortState.order === 'asc' ? 'desc' : 'asc',
    });

  const resetSort = () => {
    // 이미 기본 정렬이면 URL을 건드리지 않는다 (page 리셋 방지)
    if (!isActive) {
      return;
    }

    setParams({
      [SEARCH_PARAMS_KEY.sort]: null,
      [SEARCH_PARAMS_KEY.order]: null,
    });
  };

  return {
    sortState,
    isActive,
    toggleSort,
    setSortKey,
    toggleOrder,
    resetSort,
  };
}
