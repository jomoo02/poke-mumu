import {
  useCallback,
  useMemo,
  useState,
  useDeferredValue,
  useTransition,
} from 'react';

import { type NationalPokeView } from '.';
import { type SortKey, type Direction, getComparators } from './pokedex-sort';
import { type Type } from '@/app/entities/type/model';

export default function usePokedex(pokes: NationalPokeView[]) {
  const [sortKey, setSortKey] = useState<SortKey>('dexNumber');
  const [filterTypes, setFilterTypes] = useState<Type[]>([]);
  const [direction, setDirection] = useState<Direction>('asc');
  const [inputValue, setInputValue] = useState('');

  const [isPending, startTransition] = useTransition();

  const deferredInput = useDeferredValue(inputValue);
  const normalizedSearch = useMemo(
    () => (deferredInput ?? '').trim(),
    [deferredInput],
  );

  const handleChangeTypes = useCallback((newTypes: Type[]) => {
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
    const factor = direction === 'asc' ? 1 : -1;
    const cmp = getComparators(sortKey);

    return filteredAndSearched.slice().sort((a, b) => {
      const res = factor * cmp(a, b);
      if (res !== 0) return res;

      const dexRes = a.dexNumber - b.dexNumber;
      if (dexRes !== 0) return dexRes;

      // 같은 dexNumber 내에서 id로 정렬 (id가 작을수록 원본)
      // 내림차순이면 id 비교도 반대
      const aId = a.id ?? Number.MAX_SAFE_INTEGER;
      const bId = b.id ?? Number.MAX_SAFE_INTEGER;
      return factor * (aId - bId);
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
