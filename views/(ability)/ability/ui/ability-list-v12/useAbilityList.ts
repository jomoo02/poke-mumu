'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';

import { PAGE_SIZE, sortAbilities, type AbilitySort } from './lib';

/** 검색 필터 → 정렬 → 현재 페이지 슬라이스 */
export default function useAbilityList(
  abilities: Ability[],
  sort: AbilitySort,
) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('search') ?? '';

  const filtered = useMemo(() => {
    const matchesKeyword = createSearchMatcher(keyword);
    return abilities.filter(({ nameKo, nameEn, nameJa }) =>
      matchesKeyword(nameKo, nameEn, nameJa),
    );
  }, [abilities, keyword]);

  const sorted = useMemo(() => sortAbilities(filtered, sort), [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  // 잘못된 값(음수, 0, 문자열, 소수, 범위 초과)은 1~totalPages로 보정
  const requestedPage = Math.trunc(Number(searchParams.get('page'))) || 1;
  const page = Math.min(Math.max(1, requestedPage), totalPages);

  const startIndex = (page - 1) * PAGE_SIZE;

  const pageAbilities = useMemo(
    () => sorted.slice(startIndex, startIndex + PAGE_SIZE),
    [sorted, startIndex],
  );

  return {
    pageAbilities,
    page,
    totalPages,
    totalCount: sorted.length,
  };
}
