'use client';

import { SortMenu } from '@/_shared/ui/sort-menu';

import {
  SORT_OPTIONS,
  getOrderText,
  getSortLabel,
  useMoveSort,
} from '../../model/move-sort';

// [위력 높은 순 ▾] → md 미만 시트, md 이상 드롭다운 (lg 이상은 테이블 헤더가 정렬)
// 처음 고른 기준은 그 기준의 기본 방향, 선택된 기준을 다시 누르면 방향만 뒤집는다 (헤더와 같은 규칙)
export default function MoveSort() {
  const { sortState, isActive, toggleSort, resetSort } = useMoveSort();

  const { sort, order } = sortState;

  const nextOrder = order === 'asc' ? 'desc' : 'asc';

  return (
    <SortMenu
      options={SORT_OPTIONS}
      selected={{
        key: sort,
        orderText: getOrderText(sort, order),
        sortLabel: getSortLabel(sortState),
        nextSortLabel: getSortLabel({ sort, order: nextOrder }),
      }}
      onSelect={toggleSort}
      onReset={resetSort}
      isActive={isActive}
      hint="선택한 기준을 다시 누르면 반대로 정렬돼요"
    />
  );
}
