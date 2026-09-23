'use client';

import { useMemo } from 'react';

import type { Ability } from '@/entities/ability/model';

import { filterAbilities, useAbilitySearch } from '../ability-search';
import { sortAbilities, useAbilitySort } from '../ability-sort';
import { paginate, usePage, PAGE_SIZE } from '../ability-pagination';

/**
 * 특성 목록 파생: 검색 필터 → 정렬 → 현재 페이지 슬라이스.
 * searchParams 읽기는 각 상태 훅(useAbilitySearch/useAbilitySort/usePage)에 위임하고,
 * 여기서는 순수 함수(filterAbilities/sortAbilities/paginate)로 조합만 한다.
 */
export function useAbilities(abilities: Ability[]) {
  const { keyword } = useAbilitySearch();
  const { sort } = useAbilitySort();
  const { page: requestedPage } = usePage();

  const filtered = useMemo(
    () => filterAbilities(abilities, keyword),
    [abilities, keyword],
  );

  const sorted = useMemo(
    () => sortAbilities(filtered, sort),
    [filtered, sort],
  );

  const { items, page, totalPages } = useMemo(
    () => paginate(sorted, requestedPage, PAGE_SIZE),
    [sorted, requestedPage],
  );

  return {
    pageAbilities: items,
    page,
    totalPages,
    totalCount: sorted.length,
  };
}
