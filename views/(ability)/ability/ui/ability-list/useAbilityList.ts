'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';

export default function useAbilityList(abilities: Ability[]) {
  const searchParams = useSearchParams();

  const filteredAbilities = useMemo(() => {
    const matchesKeyword = createSearchMatcher(
      searchParams.get('search') ?? '',
    );

    const filtered = abilities.filter(({ nameKo, nameEn, nameJa }) => {
      return matchesKeyword(nameKo, nameEn, nameJa);
    });

    return filtered.sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));
  }, [abilities, searchParams]);

  return { filteredAbilities };
}
