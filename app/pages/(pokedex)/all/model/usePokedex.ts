import { useMemo } from 'react';

import { Type } from '@/app/entities/type/model';

import { type NationalPokeView, type SortOption, getComparator } from '.';

export default function usePokedex({
  pokes,
  filterTypes,
  normalizedSearch,
  sortOption,
}: {
  pokes: NationalPokeView[];
  filterTypes: Type[];
  normalizedSearch: string;
  sortOption: SortOption;
}) {
  const enhancedPokes = useMemo(() => {
    return pokes.map((p) => ({
      ...p,
      nameLower: p.name.toLowerCase(),
      type1Identifier: p.type1?.identifier ?? '',
      type2Identifier: p.type2?.identifier ?? '',
    }));
  }, [pokes]);

  const filteredAndSearched = useMemo(() => {
    if (filterTypes.length === 0 && !normalizedSearch) return enhancedPokes;

    return enhancedPokes.filter((poke) => {
      const typeMatch =
        filterTypes.length === 0 ||
        filterTypes.every(
          (t) =>
            poke.type1Identifier === t.identifier ||
            poke.type2Identifier === t.identifier,
        );

      const nameMatch =
        !normalizedSearch || poke.nameLower.includes(normalizedSearch);

      return typeMatch && nameMatch;
    });
  }, [enhancedPokes, filterTypes, normalizedSearch]);

  const sortedPokes = useMemo(() => {
    const { key, direction } = sortOption;
    const factor = direction === 'asc' ? 1 : -1;
    const cmp = getComparator(key);

    return filteredAndSearched.slice().sort((a, b) => {
      const res = factor * cmp(a, b);
      if (res !== 0) return res;
      return a.dexNumber - b.dexNumber;
    });
  }, [filteredAndSearched, sortOption]);

  return {
    enhancedPokes,
    sortedPokes,
  };
}
