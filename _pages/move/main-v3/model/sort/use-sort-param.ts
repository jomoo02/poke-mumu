import { useMemo } from 'react';

import { useListQueryStates } from '../url-state';
import { getKeySelectedSort, getToggledSort } from './sort-option';
import {
  isSameSort,
  type MoveSort,
  type SortKey,
  type SortOrder,
} from './sort-moves';
import { sortSearchParams } from './sort-search-params';

// 정렬 (?sort=&order=)
export function useSortParam() {
  const [{ sort, order }, write] = useListQueryStates(sortSearchParams);

  const sortState = useMemo<MoveSort>(() => ({ sort, order }), [sort, order]);

  // 같은 정렬을 다시 고르면 쓰지 않는다 (page도 유지)
  const setSort = (next: MoveSort) => {
    if (isSameSort(next, sortState)) {
      return;
    }

    write({ sort: next.sort, order: next.order });
  };

  // 표 머리글: 같은 기준이면 방향 반전
  const toggleSort = (key: SortKey) => setSort(getToggledSort(sortState, key));

  // 정렬 시트·메뉴의 기준 섹션: 다른 기준이면 그 기준의 첫 방향부터
  const selectKey = (key: SortKey) =>
    setSort(getKeySelectedSort(sortState, key));

  // 정렬 시트·메뉴의 방향 섹션: 기준은 그대로
  const selectOrder = (order: SortOrder) =>
    setSort({ sort: sortState.sort, order });

  return { sortState, toggleSort, selectKey, selectOrder };
}
