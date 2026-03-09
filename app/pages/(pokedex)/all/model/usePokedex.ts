import {
  useMemo,
  useState,
  useDeferredValue,
  useTransition,
  startTransition,
} from 'react';

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
  const [isPending, startTransition] = useTransition();
  const handleChangeType = (newType: string) => {
    if (newType === filterType) return; // 동일 선택 시 무시 -> 렌더 방지
    startTransition(() => {
      setFilterType(newType);
    });
  };
  const handleChangeSortKey = (newSortKey: string) => {
    if (newSortKey === sortKey) {
      // 같은 키 클릭이면 방향만 토글 (이런 경우에도 transition 적용)
      startTransition(() => {
        setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      });
      return;
    }
    startTransition(() => {
      setSortKey(newSortKey as SortKey);
      setDirection('asc');
    });
  };
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

  return {
    pokes: sortedPokes,
    setSortKey: handleChangeSortKey,
    filterType,
    setFilterType: handleChangeType,
    inputValue,
    setInputValue,
    sortKey,
    direction,
    isPending,
  };
}
