// imports 변경: useDeferredValue, useCallback 추가
import { useMemo, useState, useDeferredValue, useCallback } from 'react';

import { type NationalPokeView } from '.';
import {
  type SortKey,
  type Direction,
  getComparators,
  isSortKey,
} from './pokedex-table';

export default function usePokedex(pokes: NationalPokeView[]) {
  const [sortKey, setSortKey] = useState<SortKey>('dexNumber');
  const [filterType, setFilterType] = useState<string>('all');
  const [direction, setDirection] = useState<Direction>('asc');
  const [inputValue, setInputValue] = useState('');

  const deferredInput = useDeferredValue(inputValue);
  const normalizedSearch = (deferredInput ?? '').trim();

  // 내부 변경: 전처리된 배열 추가
  const enhancedPokes = useMemo(() => {
    return pokes.map((p) => ({
      ...p,
      nameLower: p.name.toLowerCase(),
      type1Id: p.type1?.identifier ?? '',
      type2Id: p.type2?.identifier ?? '',
    }));
  }, [pokes]);
  // 필터(타입) + 검색을 한 번에 처리
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

  // 정렬은 한 번만 수행
  const sortedPokes = useMemo(() => {
    const factor = direction === 'asc' ? 1 : -1;
    const cmp = getComparators(sortKey);

    const arr = filteredAndSearched.slice(); // 복사해서 정렬
    arr.sort((a, b) => {
      const res = factor * cmp(a, b);
      if (res !== 0) return res;
      return a.dexNumber - b.dexNumber;
    });
    return arr;
  }, [filteredAndSearched, sortKey, direction]);

  const handleChangeSortKey = (target: string) => {
    if (!isSortKey(target)) {
      return;
    }

    const prevSortKey = sortKey;

    setSortKey(target);
    setDirection((prev) =>
      prevSortKey === target ? (prev === 'asc' ? 'desc' : 'asc') : 'asc',
    );
  };

  return {
    pokes: sortedPokes,
    setSortKey: handleChangeSortKey,
    filterType,
    setFilterType,
    inputValue,
    setInputValue,
    sortKey,
    direction,
  };
}
