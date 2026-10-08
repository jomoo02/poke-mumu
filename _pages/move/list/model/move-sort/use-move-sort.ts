'use client';

import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { isSameSort, type MoveSort, type SortKey } from './move-sort';
import { getInitialOrder } from './option';
import { moveSearchParams } from '../search-params';

const PARSERS = {
  sort: moveSearchParams.sort,
  order: moveSearchParams.order,
  page: moveSearchParams.page,
};

export function useMoveSort() {
  // 기본 정렬(번호순)은 URL에 쓰지 않는다 (moveSearchParams의 기본값)
  const [{ sort, order }, setParams] = useQueryStates(PARSERS);

  const sortState = useMemo<MoveSort>(() => ({ sort, order }), [sort, order]);

  const setSort = (next: MoveSort) => {
    // 같은 정렬을 다시 고르면 page도 유지한다
    if (isSameSort(next, sortState)) {
      return;
    }

    setParams({ sort: next.sort, order: next.order, page: null });
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
