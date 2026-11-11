import { useMemo } from 'react';

import { useListQueryStates } from '../url-state';
import { getToggledSort } from './sort-option';
import { isSameSort, type AbilitySort, type SortKey } from './sort-abilities';
import { sortSearchParams } from './sort-search-params';

// 정렬 (?sort=&order=)
export function useSortParam() {
  const [{ sort, order }, write] = useListQueryStates(sortSearchParams);

  const sortState = useMemo<AbilitySort>(
    () => ({ sort, order }),
    [sort, order],
  );

  // 같은 정렬을 다시 고르면 쓰지 않는다 (page도 유지)
  const setSort = (next: AbilitySort) => {
    if (isSameSort(next, sortState)) {
      return;
    }

    write({ sort: next.sort, order: next.order });
  };

  // 표 머리글·정렬 목록
  const toggleSort = (key: SortKey) => setSort(getToggledSort(sortState, key));

  return { sortState, toggleSort };
}
