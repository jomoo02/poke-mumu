import {
  useCallback,
  useMemo,
  useState,
  useDeferredValue,
  useTransition,
} from 'react';

import { type NationalPokeView } from '.';
import { type SortKey, type Direction, getComparator } from './pokedex-sort';
import useInputName from './useInputName';
import { Type } from '@/app/entities/type/model';

type SortOption = { key: SortKey; direction: Direction };

export default function usePokedexV3(pokes: NationalPokeView[]) {
  const [filterTypes, setFilterTypes] = useState<Type[]>([]);

  const [sort, setSort] = useState<SortOption>({
    key: 'dexNumber',
    direction: 'asc',
  });

  const { inputValue, setInputValue, normalizedSearch } = useInputName();

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
    const { key, direction } = sort;
    const factor = direction === 'asc' ? 1 : -1;
    const cmp = getComparator(key);

    return filteredAndSearched.slice().sort((a, b) => {
      const res = factor * cmp(a, b);
      if (res !== 0) return res;
      return a.dexNumber - b.dexNumber;
    });
  }, [filteredAndSearched, sort]);

  const getFilteredCount = useCallback(
    (types: Type[]) => {
      if (types.length === 0) return enhancedPokes.length;
      return enhancedPokes.filter((poke) =>
        types.every(
          (t) =>
            poke.type1Identifier === t.identifier ||
            poke.type2Identifier === t.identifier,
        ),
      ).length;
    },
    [enhancedPokes],
  );
  return {
    sort,
    pokes: sortedPokes,
    sortKey: sort.key,
    direction: sort.direction,
    setSort,
    filterTypes,
    setFilterTypes,
    inputValue,
    setInputValue,
    getFilteredCount,
  };
}
