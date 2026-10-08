'use client';

import { SortMenu } from '@/_shared/ui/sort-menu';

import { SORT_OPTIONS, getSortLabel, useMoveSort } from '../../model/move-sort';

// [정렬: 기술번호 ▾ │ ↑] 기준을 고르면 그 기준의 기본 방향, 방향 칸은 누르면 반대로.
// lg 이상은 테이블 헤더로도 정렬할 수 있다 (같은 상태를 공유)
export default function MoveSortMenu() {
  const { sortState, selectKey, toggleOrder } = useMoveSort();

  const { sort, order } = sortState;

  const nextOrder = order === 'asc' ? 'desc' : 'asc';

  return (
    <SortMenu
      options={SORT_OPTIONS}
      selectedKey={sort}
      onSelectKey={selectKey}
      order={{
        sortLabel: getSortLabel({ sort, order }),
        direction: order,
        nextSortLabel: getSortLabel({ sort, order: nextOrder }),
      }}
      onToggleOrder={toggleOrder}
    />
  );
}
