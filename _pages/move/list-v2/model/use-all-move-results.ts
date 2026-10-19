'use client';

import { useMemo } from 'react';

import type { Move } from '@/_entities/move';
// 비교용 테스트 페이지라 /move 목록(_pages/move/list)의 모델을 그대로 가져다 쓴다
import {
  filterMovesByKeyword,
  useMoveSearch,
} from '@/_pages/move/list/model/move-search';
import {
  filterMoves,
  useMoveFilter,
} from '@/_pages/move/list/model/move-filter';
import { sortMoves, useMoveSort } from '@/_pages/move/list/model/move-sort';

/**
 * 기술 목록 파생: 검색 → 필터 → 정렬. /move의 useMoveResults에서 페이지 슬라이스만 뺐다.
 * 전체(약 900개)를 가상화 테이블이 한 번에 받는다
 */
export function useAllMoveResults(moves: Move[]) {
  const { keyword } = useMoveSearch();

  const { filter } = useMoveFilter();

  const { sortState, toggleSort } = useMoveSort();

  // 각 단계를 memo해야 다음 단계의 의존성이 안정된다
  const searched = useMemo(
    () => filterMovesByKeyword(moves, keyword),
    [moves, keyword],
  );

  const filtered = useMemo(
    () => filterMoves(searched, filter),
    [searched, filter],
  );

  const sorted = useMemo(
    () => sortMoves(filtered, sortState),
    [filtered, sortState],
  );

  return { moves: sorted, sortState, toggleSort };
}
