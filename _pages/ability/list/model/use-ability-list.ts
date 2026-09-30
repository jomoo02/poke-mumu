'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { paginate, usePageParam } from '@/_shared/lib/pagination';
import type { AbilityDetail } from '@/_entities/ability';

import { filterAbilities } from './ability-search';
import { sortAbilities, useAbilitySort } from './ability-sort';
import { PAGE_SIZE } from '../config/pagination';
import { SEARCH_PARAMS_KEY } from '../config/search-params';

/**
 * 특성 목록 파생: 검색 필터 → 정렬 → 현재 페이지 슬라이스.
 * URL 값은 여기(검색어)와 상태 훅(useAbilitySort, usePageParam)이 읽고,
 * 계산은 순수 함수(filterAbilities, sortAbilities, paginate)로 조합한다.
 */
export function useAbilityList(abilities: AbilityDetail[]) {
  const searchParams = useSearchParams();

  const keyword = searchParams.get(SEARCH_PARAMS_KEY.search) ?? '';

  const { sortState } = useAbilitySort();

  const { page: requestedPage } = usePageParam(SEARCH_PARAMS_KEY.page);

  // 각 단계를 memo해야 다음 단계의 의존성이 안정된다
  const filtered = useMemo(
    () => filterAbilities(abilities, keyword),
    [abilities, keyword],
  );

  const sorted = useMemo(
    () => sortAbilities(filtered, sortState),
    [filtered, sortState],
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
