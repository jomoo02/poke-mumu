import {
  useCallback,
  useMemo,
  useState,
  useDeferredValue,
  useTransition,
} from 'react';

import { type NationalPokeView } from '.';
import { type SortKey, type Direction, getComparators } from './pokedex-table';

export default function usePokedexV3(pokes: NationalPokeView[]) {
  const [sortKey, setSortKey] = useState<SortKey>('dexNumber');
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [direction, setDirection] = useState<Direction>('asc');
  const [inputValue, setInputValue] = useState('');

  const [isPending, startTransition] = useTransition();

  const deferredInput = useDeferredValue(inputValue);
  const normalizedSearch = useMemo(
    () => (deferredInput ?? '').trim(),
    [deferredInput],
  );

  const handleChangeTypes = useCallback((newTypes: string[]) => {
    startTransition(() => setFilterTypes(newTypes));
  }, []);

  const handleToggleSortKey = useCallback(
    (newSortKey: SortKey) => {
      startTransition(() => {
        if (newSortKey === sortKey) {
          setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
          setSortKey(newSortKey);
          setDirection('asc');
        }
      });
    },
    [sortKey],
  );

  // pokes 절대 안 바뀜 → 최초 1번만 실행, 이후 캐시 유지
  const enhancedPokes = useMemo(() => {
    return pokes.map((p) => ({
      ...p,
      nameLower: p.name.toLowerCase(),
      type1Id: p.type1?.identifier ?? '',
      type2Id: p.type2?.identifier ?? '',
    }));
  }, [pokes]);

  const filteredAndSearched = useMemo(() => {
    if (filterTypes.length === 0 && !normalizedSearch) return enhancedPokes;

    return enhancedPokes.filter((poke) => {
      const typeMatch =
        filterTypes.length === 0 ||
        filterTypes.every((t) => poke.type1Id === t || poke.type2Id === t);

      const nameMatch =
        !normalizedSearch || poke.nameLower.includes(normalizedSearch);

      return typeMatch && nameMatch;
    });
  }, [enhancedPokes, filterTypes, normalizedSearch]);

  const sortedPokes = useMemo(() => {
    const factor = direction === 'asc' ? 1 : -1;
    const cmp = getComparators(sortKey);

    return filteredAndSearched.slice().sort((a, b) => {
      const res = factor * cmp(a, b);
      if (res !== 0) return res;
      return a.dexNumber - b.dexNumber;
    });
  }, [filteredAndSearched, sortKey, direction]);

  return {
    pokes: sortedPokes,
    sortKey,
    direction,
    toggleSortKey: handleToggleSortKey,
    filterTypes,
    setFilterTypes: handleChangeTypes,
    inputValue,
    setInputValue,
    isPending,
  };
}
