'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';

export default function useAbilityList(abilities: Ability[]) {
  const searchParams = useSearchParams();

  // 검색해도 순번이 바뀌지 않도록 필터링 전 전체 목록 기준으로 순번을 고정
  const orderedAbilities = useMemo(
    () =>
      [...abilities]
        .sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'))
        .map((ability, idx) => ({ ability, order: idx + 1 })),
    [abilities],
  );

  const filteredAbilities = useMemo(() => {
    const matchesKeyword = createSearchMatcher(
      searchParams.get('search') ?? '',
    );

    return orderedAbilities.filter(({ ability: { nameKo, nameEn, nameJa } }) =>
      matchesKeyword(nameKo, nameEn, nameJa),
    );
  }, [orderedAbilities, searchParams]);

  return { filteredAbilities };
}
