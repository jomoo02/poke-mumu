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

type TableHead = SortKey | 'type' | 'pokeImage';

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
  total: (a, b) => a.total - b.total,
  hp: (a, b) => a.hp - b.hp,
  attack: (a, b) => a.attack - b.attack,
  defense: (a, b) => a.defense - b.defense,
  specialAttack: (a, b) => a.specialAttack - b.specialAttack,
  specialDefense: (a, b) => a.specialDefense - b.specialDefense,
  speed: (a, b) => a.speed - b.speed,
};

const getComparators = (key: SortKey) => COMPARATORS[key];

export {
  isSortKey,
  getComparators,
  type SortKey,
  type TableHead,
  type Direction,
};
