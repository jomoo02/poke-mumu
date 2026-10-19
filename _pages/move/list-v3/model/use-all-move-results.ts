'use client';

import { useMemo } from 'react';

import type { Move } from '@/_entities/move';
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
 * 기술 목록 파생: 검색 → 필터 → 정렬. 기존 useMoveResults에서 페이지 슬라이스만 뺐다.
 * 전체(약 900개)를 넘기고, 테이블·카드가 가상화로 화면 근처 항목만 그린다
 */
export function useAllMoveResults(moves: Move[]) {
  const { keyword } = useMoveSearch();

  const { filter } = useMoveFilter();

  const { sortState } = useMoveSort();

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

  return { moves: sorted, totalCount: sorted.length };
}
