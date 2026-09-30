'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { paginate, usePageParam } from '@/_shared/lib/pagination';
import type { Move } from '@/_entities/move';

import { filterMovesByKeyword } from './move-search';
import { filterMoves, useMoveFilter } from './move-filter';
import { sortMoves, useMoveSort } from './move-sort';
import { PAGE_SIZE } from '../config/pagination';
import { SEARCH_PARAMS_KEY } from '../config/search-params';

/**
 * 기술 목록 파생: 검색 → 필터 → 정렬 → 현재 페이지 슬라이스.
 * URL 값은 여기(검색어)와 상태 훅(useMoveFilter, useMoveSort, usePageParam)이 읽고,
 * 계산은 순수 함수(filterMovesByKeyword, filterMoves, sortMoves, paginate)로 조합한다.
 */
export function useMoveList(moves: Move[]) {
  const searchParams = useSearchParams();

  const keyword = searchParams.get(SEARCH_PARAMS_KEY.search) ?? '';

  const filter = useMoveFilter();

  const { sortState } = useMoveSort();

  const { page: requestedPage } = usePageParam(SEARCH_PARAMS_KEY.page);

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
