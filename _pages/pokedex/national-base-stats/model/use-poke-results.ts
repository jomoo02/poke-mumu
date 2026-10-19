'use client';

import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { paginate } from '@/_shared/lib/pagination';

import type { BaseStatsPoke } from './base-stats-poke';
import { filterPokesByKeyword, usePokeSearch } from './poke-search';
import { filterPokes, usePokeFilter } from './poke-filter';
import { sortPokes, usePokeSort } from './poke-sort';
import { pokeSearchParams } from './search-params';
import { PAGE_SIZE } from '../config/national-base-stats';

const PAGE_PARSER = { page: pokeSearchParams.page };

/**
 * 포켓몬 목록 파생: 검색 → 필터 → 정렬 → 현재 페이지 슬라이스.
 * URL 값은 상태 훅(usePokeSearch, usePokeFilter, usePokeSort)과 여기(page)가 pokeSearchParams로 읽고,
 * 계산은 순수 함수(filterPokesByKeyword, filterPokes, sortPokes, paginate)로 조합한다.
 */
export function usePokeResults(pokes: BaseStatsPoke[]) {
  const { keyword } = usePokeSearch();

  const { filter } = usePokeFilter();

  const { sortState } = usePokeSort();

  const [{ page: requestedPage }] = useQueryStates(PAGE_PARSER);

  // 각 단계를 memo해야 다음 단계의 의존성이 안정된다
  const searched = useMemo(
    () => filterPokesByKeyword(pokes, keyword),
    [pokes, keyword],
  );

  const filtered = useMemo(
    () => filterPokes(searched, filter),
    [searched, filter],
  );

  const sorted = useMemo(
    () => sortPokes(filtered, sortState),
    [filtered, sortState],
  );

  const { items, page, totalPages } = useMemo(
    () => paginate(sorted, requestedPage, PAGE_SIZE),
    [sorted, requestedPage],
  );

  return {
    pagePokes: items,
    page,
    totalPages,
    totalCount: sorted.length,
  };
}
