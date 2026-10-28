'use client';

import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { paginate } from '@/_shared/lib/pagination';

import { PAGE_SIZE } from '../config/national-base-stats';
import type { BaseStatsPoke } from './base-stats-poke';
import {
  countMatchesInOtherLanguages,
  filterPokesByKeyword,
  usePokeSearch,
} from './poke-search';
import {
  filterPokes,
  usePokeFilter,
  type PokeFilterOptions,
} from './poke-filter';
import { sortPokes, usePokeSort } from './poke-sort';
import { useNameLanguage } from './name-language';
import { pokeSearchParams } from './search-params';

const PAGE_PARSER = { page: pokeSearchParams.page };

/**
 * 포켓몬 목록 파생: 필터 → 검색(고른 이름 언어) → 정렬 → 현재 페이지 슬라이스.
 * 한 페이지가 PAGE_SIZE개라 조건을 바꾸면 바로 다시 그린다 (지연 렌더·가상화 없음)
 */
export function usePokeResults(
  pokes: BaseStatsPoke[],
  filterOptions: PokeFilterOptions,
) {
  const { keyword } = usePokeSearch();

  const { filter } = usePokeFilter(filterOptions);

  const { sortState, toggleSort, selectKey, selectOrder } = usePokeSort();

  const { language } = useNameLanguage();

  const [{ page: requestedPage }] = useQueryStates(PAGE_PARSER);

  // 각 단계를 memo해야 다음 단계의 의존성이 안정된다.
  // 필터를 먼저 해, 검색 결과가 없을 때 다른 언어 안내도 필터가 걸린 목록에서 센다
  const filtered = useMemo(() => filterPokes(pokes, filter), [pokes, filter]);

  const searched = useMemo(
    () => filterPokesByKeyword(filtered, keyword, language),
    [filtered, keyword, language],
  );

  const sorted = useMemo(
    () => sortPokes(searched, sortState, language),
    [searched, sortState, language],
  );

  const { items, page, totalPages } = useMemo(
    () => paginate(sorted, requestedPage, PAGE_SIZE),
    [sorted, requestedPage],
  );

  // 결과가 없을 때만 센다: 고른 언어로는 없지만 다른 언어 이름으로는 찾히는 수
  const otherLanguageMatches = useMemo(
    () =>
      sorted.length === 0
        ? countMatchesInOtherLanguages(filtered, keyword, language)
        : [],
    [sorted.length, filtered, keyword, language],
  );

  return {
    pagePokes: items,
    page,
    totalPages,
    totalCount: sorted.length,
    sortState,
    language,
    // 넓은 본문 머리글: 같은 기준이면 방향 반전
    toggleSort,
    // 정렬 시트: 기준 칸(그 기준의 첫 방향부터) / 방향 칸
    selectKey,
    selectOrder,
    otherLanguageMatches,
  };
}
