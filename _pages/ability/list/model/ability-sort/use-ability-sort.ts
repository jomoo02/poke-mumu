'use client';

import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { isSameSort, type AbilitySort, type SortKey } from './ability-sort';
import { abilitySearchParams } from '../search-params';

const PARSERS = {
  sort: abilitySearchParams.sort,
  order: abilitySearchParams.order,
  page: abilitySearchParams.page,
};

// 모든 기준이 순서형이라 기준을 새로 고르면 asc부터 (option.ts)
const INITIAL_ORDER = 'asc';

export function useAbilitySort() {
  // 기본 정렬(번호순)은 URL에 쓰지 않는다 (abilitySearchParams의 기본값)
  const [{ sort, order }, setParams] = useQueryStates(PARSERS);

  const sortState = useMemo<AbilitySort>(
    () => ({ sort, order }),
    [sort, order],
  );

  const setSort = (next: AbilitySort) => {
    // 같은 정렬을 다시 고르면 page도 유지한다
    if (isSameSort(next, sortState)) {
      return;
    }

    setParams({ sort: next.sort, order: next.order, page: null });
  };

  // 테이블 헤더: 같은 기준이면 방향 반전, 다른 기준이면 asc부터
  const toggleSort = (nextKey: SortKey) => {
    if (nextKey === sortState.sort) {
      setSort({
        sort: nextKey,
        order: sortState.order === 'asc' ? 'desc' : 'asc',
      });
      return;
    }
    setSort({ sort: nextKey, order: INITIAL_ORDER });
  };

  // 정렬 메뉴 기준 칸: 다른 기준이면 asc부터, 같은 기준이면 그대로
  const selectKey = (nextKey: SortKey) => {
    setSort({
      sort: nextKey,
      order: nextKey === sortState.sort ? sortState.order : INITIAL_ORDER,
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
