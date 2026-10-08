'use client';

import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { paginate } from '@/_shared/lib/pagination';
import type { Move } from '@/_entities/move';

import { filterMovesByKeyword, useMoveSearch } from './move-search';
import { filterMoves, useMoveFilter } from './move-filter';
import { sortMoves, useMoveSort } from './move-sort';
import { moveSearchParams } from './search-params';
import { PAGE_SIZE } from '../config/move-list';

const PAGE_PARSER = { page: moveSearchParams.page };

/**
 * 기술 목록 파생: 검색 → 필터 → 정렬 → 현재 페이지 슬라이스.
 * URL 값은 상태 훅(useMoveSearch, useMoveFilter, useMoveSort)과 여기(page)가 moveSearchParams로 읽고,
 * 계산은 순수 함수(filterMovesByKeyword, filterMoves, sortMoves, paginate)로 조합한다.
 */
export function useMoveResults(moves: Move[]) {
  const { keyword } = useMoveSearch();

  const { filter } = useMoveFilter();

  const { sortState } = useMoveSort();

  const [{ page: requestedPage }] = useQueryStates(PAGE_PARSER);

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

  const { items, page, totalPages } = useMemo(
    () => paginate(sorted, requestedPage, PAGE_SIZE),
    [sorted, requestedPage],
  );

  return {
    pageMoves: items,
    page,
    totalPages,
    totalCount: sorted.length,
  };
}
