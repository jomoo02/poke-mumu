'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';

import { VALID_APPEARED_GENS, SEARCH_PARAMS } from '../../config';

export default function useAbilityList(abilities: Ability[]) {
  const searchParams = useSearchParams();

  const filteredAbilities = useMemo(() => {
    const matchesKeyword = createSearchMatcher(
      searchParams.get(SEARCH_PARAMS.SEARCH) ?? '',
    );

    const isChampionsOnly = searchParams.get(SEARCH_PARAMS.CHAMPIONS) === '1';

    const selectedGens = new Set(
      searchParams
        .getAll(SEARCH_PARAMS.APPEARED)
        .map(Number)
        .filter((gen) => VALID_APPEARED_GENS.has(gen)),
    );

    const filtered = abilities.filter(
      ({ nameKo, nameEn, nameJa, gen, isChampions }) => {
        const matchesGen = selectedGens.size === 0 || selectedGens.has(gen);

        const matchesChampions = !isChampionsOnly || Boolean(isChampions);

        return (
          matchesKeyword(nameKo, nameEn, nameJa) &&
          matchesGen &&
          matchesChampions
        );
      },
    );

    return filtered.sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));
  }, [abilities, searchParams]);

  return { filteredAbilities };
}
