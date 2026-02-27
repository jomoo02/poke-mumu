import {
  useMemo,
  useState,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
} from 'react';

import { NationalPokeView } from '.';

const SORT_KEY_LIST = [
  'dexNumber',
  'name',
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
  'total',
] as const;

export type SortKey = (typeof SORT_KEY_LIST)[number];

function isSortKey(value: string): value is SortKey {
  return (SORT_KEY_LIST as readonly string[]).includes(value);
}

export type Direction = 'asc' | 'desc';

export type SortState = {
  sortKey: SortKey;
  type: string;
  direction: 'asc' | 'desc';
};

const comparators: Record<
  SortKey,
  (a: NationalPokeView, b: NationalPokeView) => number
> = {
  dexNumber: (a, b) => a.dexNumber - b.dexNumber,
  name: (a, b) => String(a.name).localeCompare(String(b.name)),
  total: (a, b) => a.total - b.total,
  hp: (a, b) => a.hp - b.hp,
  attack: (a, b) => a.attack - b.attack,
  defense: (a, b) => a.defense - b.defense,
  specialAttack: (a, b) => a.specialAttack - b.specialAttack,
  specialDefense: (a, b) => a.specialDefense - b.specialDefense,
  speed: (a, b) => a.speed - b.speed,
};

export function useSortPokedex(pokes: NationalPokeView[]) {
  const [sortKey, setSortKey] = useState<SortKey>('dexNumber');
  const [filterType, setFilterType] = useState<string>('all');
  const [direction, setDirection] = useState<Direction>('asc');

  const [inputValue, setInputValue] = useState('');

  const deferredSortKey = useDeferredValue(sortKey);
  const deferredDirection = useDeferredValue(direction);
  const deferredFilterType = useDeferredValue(filterType);

  const isStale =
    sortKey !== deferredSortKey ||
    direction !== deferredDirection ||
    filterType !== deferredFilterType;

  const filteredPokes = useMemo(() => {
    if (deferredFilterType === 'all') {
      return [...pokes];
    }
    return [...pokes].filter(
      (poke) =>
        poke.type1?.identifier === deferredFilterType ||
        poke.type2?.identifier === deferredFilterType,
    );
  }, [pokes, deferredFilterType]);

  const sortedPokes = useMemo(() => {
    const cmp = comparators[deferredSortKey];
    if (!cmp) {
      return [...filteredPokes];
    }

    const factor = deferredDirection === 'asc' ? 1 : -1;

    return [...filteredPokes].sort((a, b) => {
      const res = factor * cmp(a, b);

      if (res !== 0) {
        return res;
      }

      if (deferredSortKey !== 'dexNumber') {
        return a.dexNumber - b.dexNumber;
      }

      return (a.id ?? -1) - (b.id ?? -1);
    });
  }, [deferredDirection, filteredPokes, deferredSortKey]);

  const handleChangeFilterType = (target: string) => {
    setFilterType(target);
  };

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

  // input
  // const inputValueFilterdPokes = useMemo(() => {
  //   return sortedPokes.filter(({ name }) => name.includes(inputValue));
  // }, [inputValue, sortedPokes]);

  // useLayoutEffect(() => {
  //   setInputValue('');
  // }, [deferredFilterType]);

  return {
    handleChangeFilterType,
    handleChangeSortKey,
    sortedPokes,
    filterType,
    direction,
    sortKey,
    isStale,
    // inputValueFilterdPokes,
    inputValue,
    setInputValue,
  };
}
