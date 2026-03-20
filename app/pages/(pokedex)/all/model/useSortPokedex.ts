import { useState } from 'react';
import { type NationalPokeView } from '.';

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

type SortKey = (typeof SORT_KEY_LIST)[number];

type Direction = 'asc' | 'desc';

const isSortKey = (value: string): value is SortKey => {
  return (SORT_KEY_LIST as readonly string[]).includes(value);
};

const COMPARATORS: Record<
  SortKey,
  (a: NationalPokeView, b: NationalPokeView) => number
> = {
  dexNumber: (a, b) => a.dexNumber - b.dexNumber,
  name: (a, b) => String(a.name).localeCompare(String(b.name)),
  total: (a, b) => (a.total ?? 0) - (b.total ?? 0),
  hp: (a, b) => a.hp - b.hp,
  attack: (a, b) => a.attack - b.attack,
  defense: (a, b) => a.defense - b.defense,
  specialAttack: (a, b) => a.specialAttack - b.specialAttack,
  specialDefense: (a, b) => a.specialDefense - b.specialDefense,
  speed: (a, b) => a.speed - b.speed,
};

const getComparators = (key: SortKey) => COMPARATORS[key];

const sortOptions: { label: string; id: SortKey }[] = [
  { id: 'dexNumber', label: '도감번호' },
  { id: 'name', label: '이름' },
  { id: 'total', label: '총합' },
  { id: 'hp', label: 'HP' },
  { id: 'attack', label: '공격' },
  { id: 'defense', label: '방어' },
  { id: 'specialAttack', label: '특수공격' },
  { id: 'specialDefense', label: '특수방어' },
  { id: 'speed', label: '스피드' },
];

const getSortOptions = () => [...sortOptions];

type SortOption = { key: SortKey; direction: Direction };

function useSortPokedex() {
  const [sort, setSort] = useState<SortOption>({
    key: 'dexNumber',
    direction: 'asc',
  });
}

export {
  isSortKey,
  getComparators,
  type SortKey,
  type Direction,
  getSortOptions,
};
