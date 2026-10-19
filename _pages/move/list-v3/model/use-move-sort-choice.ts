'use client';

import { useQueryStates } from 'nuqs';

import { moveSearchParams } from '@/_pages/move/list/model/search-params';

import { findMoveSortChoice, type MoveSortChoice } from './move-sort-option';

const PARSERS = {
  sort: moveSearchParams.sort,
  order: moveSearchParams.order,
  page: moveSearchParams.page,
};

// 정렬 메뉴: 기준·방향을 한 번에 바꾼다 (기존 useMoveSort는 기준 칸·방향 칸이 따로라 나눠 바꾼다).
// 같은 URL 키라 테이블 머리글 정렬(useMoveSort)과 상태를 함께 쓴다
export function useMoveSortChoice() {
  const [{ sort, order }, setParams] = useQueryStates(PARSERS);

  const selected = findMoveSortChoice({ sort, order });

  const select = (choice: MoveSortChoice) => {
    // 같은 정렬을 다시 고르면 page도 유지한다
    if (choice.key === selected.key) {
      return;
    }

    setParams({ sort: choice.sort.sort, order: choice.sort.order, page: null });
  };

  return { selected, select };
}
