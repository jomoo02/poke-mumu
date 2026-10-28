import { useMemo } from 'react';

import {
  getKeySelectedSort,
  getToggledSort,
  isSameSort,
  type PokeSort,
  type SortKey,
  type SortOrder,
} from '../sort';
import { useListParams } from './use-list-params';

// 정렬 (?sort=&order=). 기본 정렬(도감 번호순)은 URL에 쓰지 않는다
export function useSortParams() {
  const { params, writeList } = useListParams();

  const { sort, order } = params;

  const sortState = useMemo<PokeSort>(() => ({ sort, order }), [sort, order]);

  // 같은 정렬을 다시 고르면 쓰지 않는다 (page도 유지)
  const setSort = (next: PokeSort) => {
    if (isSameSort(next, sortState)) {
      return;
    }

    writeList({ sort: next.sort, order: next.order });
  };

  // 표 머리글
  const toggleSort = (key: SortKey) => setSort(getToggledSort(sortState, key));

  // 정렬 시트: 기준 칸 / 방향 칸
  const selectSortKey = (key: SortKey) =>
    setSort(getKeySelectedSort(sortState, key));

  const selectSortOrder = (nextOrder: SortOrder) =>
    setSort({ sort, order: nextOrder });

  return { sortState, toggleSort, selectSortKey, selectSortOrder };
}
