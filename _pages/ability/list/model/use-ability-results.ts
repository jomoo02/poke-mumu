'use client';

import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { paginate } from '@/_shared/lib/pagination';
import type { AbilityDetail } from '@/_entities/ability';

import { filterAbilities, useAbilitySearch } from './ability-search';
import { sortAbilities, useAbilitySort } from './ability-sort';
import { abilitySearchParams } from './search-params';
import { PAGE_SIZE } from '../config/ability-list';

const PAGE_PARSER = { page: abilitySearchParams.page };

/**
 * 특성 목록 파생: 검색 → 정렬 → 현재 페이지 슬라이스.
 * URL 값은 상태 훅(useAbilitySearch, useAbilitySort)과 여기(page)가 abilitySearchParams로 읽고,
 * 계산은 순수 함수(filterAbilities, sortAbilities, paginate)로 조합한다.
 */
export function useAbilityResults(abilities: AbilityDetail[]) {
  const { keyword } = useAbilitySearch();

  const { sortState } = useAbilitySort();

  const [{ page: requestedPage }] = useQueryStates(PAGE_PARSER);

  // 각 단계를 memo해야 다음 단계의 의존성이 안정된다
  const searched = useMemo(
    () => filterAbilities(abilities, keyword),
    [abilities, keyword],
  );

  const sorted = useMemo(
    () => sortAbilities(searched, sortState),
    [searched, sortState],
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
