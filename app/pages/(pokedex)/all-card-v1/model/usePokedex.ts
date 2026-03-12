import {
  useCallback,
  useMemo,
  useState,
  useDeferredValue,
  useTransition,
} from 'react';

import { type NationalPokeView } from '.';
import { type SortKey, type Direction, getComparators } from './pokedex-table';

export default function usePokedex(pokes: NationalPokeView[]) {
  const [sortKey, setSortKey] = useState<SortKey>('dexNumber');
  const [filterType, setFilterType] = useState<string>('all');
  const [direction, setDirection] = useState<Direction>('asc');
  const [inputValue, setInputValue] = useState('');

  const [isPending, startTransition] = useTransition();

  const deferredInput = useDeferredValue(inputValue);
  const normalizedSearch = useMemo(
    () => (deferredInput ?? '').trim(),
    [deferredInput],
  );

  const handleChangeType = useCallback(
    (newType: string) => {
      if (newType === filterType) return;
      startTransition(() => setFilterType(newType));
    },
    [filterType],
  );

  const handleChangeSortKey = useCallback(
    (newSortKey: string) => {
      if (newSortKey === sortKey) {
        startTransition(() => {
          setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        });
        return;
      }
      startTransition(() => {
        setSortKey(newSortKey as SortKey);
        setDirection('asc');
      });
    },
    [sortKey],
  );

  const handleChangeDirection = useCallback(() => {
    setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  // pokes 절대 안 바뀜 → 최초 1번만 실행, 이후 캐시 유지
  const enhancedPokes = useMemo(() => {
    return pokes.map((p) => ({
      ...p,
      nameLower: p.name.toLowerCase(),
      type1Id: p.type1?.identifier ?? '',
      type2Id: p.type2?.identifier ?? '',
    }));
  }, [pokes]);

  // filterType, normalizedSearch 바뀔 때 enhancedPokes 재사용
  const filteredAndSearched = useMemo(() => {
    if (filterType === 'all' && !normalizedSearch) return enhancedPokes;

    return enhancedPokes.filter((poke) => {
      const typeMatch =
        filterType === 'all' ||
        poke.type1Id === filterType ||
        poke.type2Id === filterType;

      const nameMatch =
        !normalizedSearch || poke.nameLower.includes(normalizedSearch);

      return typeMatch && nameMatch;
    });
  }, [enhancedPokes, filterType, normalizedSearch]);

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
    setSortKey: handleChangeSortKey,
    filterType,
    setFilterType: handleChangeType,
    inputValue,
    setInputValue,
    toggleDirection: handleChangeDirection,
    sortKey,
    direction,
    isPending,
  };
}
