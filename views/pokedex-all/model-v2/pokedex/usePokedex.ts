// views/pokedex-all/model/pokedex/use-pokedex-list.ts
import { useMemo } from 'react';

import { type NationalPoke, type PokeFilter } from '../';
import { type SortOption, getComparator } from './comparators';
import { matchSearch } from './utils';

export default function usePokedex({
  pokes,
  filters,
  normalizedSearch,
  sort,
}: {
  pokes: NationalPoke[];
  filters: PokeFilter[];
  normalizedSearch: string;
  sort: SortOption;
}) {
  // 1) 필터 + 검색 — filters 또는 검색어 바뀔 때만
  const filteredAndSearched = useMemo(() => {
    const hasFilter = filters.length > 0;
    const hasSearch = normalizedSearch.length > 0;
    if (!hasFilter && !hasSearch) return pokes;

    return pokes.filter((poke) => {
      // 술어가 더 많이 걸러내므로 먼저 검사 후 단락
      if (hasFilter && !filters.every((fn) => fn(poke))) return false;
      if (hasSearch && !matchSearch(poke, normalizedSearch)) return false;
      return true;
    });
  }, [pokes, filters, normalizedSearch]);

  // 2) 정렬 — 결과 또는 정렬옵션 바뀔 때만
  const sortedPokes = useMemo(() => {
    const { key, direction } = sort;
    const factor = direction === 'asc' ? 1 : -1;
    const cmp = getComparator(key);

    return filteredAndSearched.slice().sort((a, b) => factor * cmp(a, b));
  }, [filteredAndSearched, sort]);

  return { sortedPokes };
}
