import { useMemo, useState, useLayoutEffect } from 'react';

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

  const filteredPokes = useMemo(() => {
    if (filterType === 'all') {
      return pokes;
    }

    return pokes.filter(
      (poke) =>
        poke.type1?.identifier === filterType ||
        poke.type2?.identifier === filterType,
    );
  }, [pokes, filterType]);

  const sortedPokes = useMemo(() => {
    const factor = direction === 'asc' ? 1 : -1;
    const cmp = getComparators(sortKey);

    return [...filteredPokes].sort((a, b) => {
      const res = factor * cmp(a, b);
      if (res !== 0) {
        return res;
      }
      return a.dexNumber - b.dexNumber;
    });
  }, [filteredPokes, sortKey, direction]);

  const searchedPokes = useMemo(() => {
    if (!inputValue) {
      return sortedPokes;
    }

    return sortedPokes.filter(({ name }) =>
      name.toLowerCase().includes(inputValue.toLowerCase().trim()),
    );
  }, [sortedPokes, inputValue]);

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

  useLayoutEffect(() => {
    setInputValue('');
  }, [filterType]);

  return {
    pokes: searchedPokes,
    setSortKey: handleChangeSortKey,
    filterType,
    setFilterType,
    inputValue,
    setInputValue,
    sortKey,
    direction,
  };
}
