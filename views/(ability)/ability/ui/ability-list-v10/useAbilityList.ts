'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';

export default function useAbilityList(abilities: Ability[]) {
  const searchParams = useSearchParams();

  const sortedAbilities = useMemo(
    () => [...abilities].sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko')),
    [abilities],
  );

  const filteredAbilities = useMemo(() => {
    const matchesKeyword = createSearchMatcher(
      searchParams.get('search') ?? '',
    );

    return sortedAbilities.filter(({ nameKo, nameEn, nameJa }) =>
      matchesKeyword(nameKo, nameEn, nameJa),
    );
  }, [sortedAbilities, searchParams]);

  return { filteredAbilities };
}

export function formatSubName({ nameEn, nameJa }: Ability) {
  return [nameEn, nameJa].filter(Boolean).join(' / ');
}
