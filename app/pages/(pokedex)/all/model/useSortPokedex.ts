import { type Type } from '@/app/entities/type/model';
import { useMemo, useState } from 'react';
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

export function useSortPokedex(pokes: NationalPokeView[], types: Type[]) {
  const [sortKey, setSortKey] = useState<SortKey>('dexNumber');
  const [filterType, setFilterType] = useState<string>('all');
  const [direction, setDirection] = useState<Direction>('asc');

  const filteredPokes = useMemo(() => {
    if (filterType === 'all') {
      return [...pokes];
    }
    return [...pokes].filter(
      (poke) =>
        poke.type1?.identifier === filterType ||
        poke.type2?.identifier === filterType,
    );
  }, [pokes, filterType]);

  const sortedPokes = useMemo(() => {
    const cmp = comparators[sortKey];
    if (!cmp) {
      return [...filteredPokes];
    }

    const factor = direction === 'asc' ? 1 : -1;

    return [...filteredPokes].sort((a, b) => {
      const res = factor * cmp(a, b);

      if (res !== 0) {
        return res;
      }

      if (sortKey !== 'dexNumber') {
        return a.dexNumber - b.dexNumber;
      }

      return (a.id ?? -1) - (b.id ?? -1);
    });
  }, [direction, filteredPokes, sortKey]);

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

  return {
    handleChangeFilterType,
    handleChangeSortKey,
    sortedPokes,
    filterType,
    direction,
    sortKey,
  };
}
