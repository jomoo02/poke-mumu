'use client';

import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { isSameSort, type PokeSort, type SortKey } from './poke-sort';
import { getInitialOrder } from './sort-option';
import { pokeSearchParams } from '../search-params';

const PARSERS = {
  sort: pokeSearchParams.sort,
  order: pokeSearchParams.order,
};

export function usePokeSort() {
  // 기본 정렬(도감 번호순)은 URL에 쓰지 않는다 (pokeSearchParams의 기본값)
  const [{ sort, order }, setParams] = useQueryStates(PARSERS);

  const sortState = useMemo<PokeSort>(() => ({ sort, order }), [sort, order]);

  const setSort = (next: PokeSort) => {
    // 같은 정렬을 다시 고르면 URL을 쓰지 않는다
    if (isSameSort(next, sortState)) {
      return;
    }

    setParams({ sort: next.sort, order: next.order });
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

  // 정렬 시트 기준 칸: 다른 기준이면 그 기준의 첫 방향부터, 같은 기준이면 그대로
  const selectKey = (nextKey: SortKey) => {
    setSort({
      sort: nextKey,
      order:
        nextKey === sortState.sort ? sortState.order : getInitialOrder(nextKey),
    });
  };

  return {
    sortState,
    // 기준·방향을 한 번에 (정렬 시트 순서 칸)
    setSort,
    toggleSort,
    selectKey,
  };
}
