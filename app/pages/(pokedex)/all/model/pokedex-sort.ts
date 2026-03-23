import { type NationalPokeView } from '.';

const SORT_KEY_LIST = [
  'dexNumber',
  'name',
  'total',
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
] as const;

type SortKey = (typeof SORT_KEY_LIST)[number];

type Direction = 'asc' | 'desc';

type SortOption = { key: SortKey; direction: Direction };

const isSortKey = (value: string): value is SortKey => {
  return (SORT_KEY_LIST as readonly string[]).includes(value);
};

const COMPARATORS: Record<
  SortKey,
  (a: NationalPokeView, b: NationalPokeView) => number
> = {
  dexNumber: (a, b) => a.dexNumber - b.dexNumber,
  name: (a, b) => String(a.name).localeCompare(String(b.name)),
  hp: (a, b) => a.hp - b.hp,
  attack: (a, b) => a.attack - b.attack,
  defense: (a, b) => a.defense - b.defense,
  specialAttack: (a, b) => a.specialAttack - b.specialAttack,
  specialDefense: (a, b) => a.specialDefense - b.specialDefense,
  speed: (a, b) => a.speed - b.speed,
  total: (a, b) => (a.total ?? 0) - (b.total ?? 0),
};

const getComparator = (key: SortKey) => COMPARATORS[key];

const SORT_KEY_LABELS: Record<SortKey, string> = {
  dexNumber: '도감번호',
  name: '이름',
  total: '총합',
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  specialAttack: '특수공격',
  specialDefense: '특수방어',
  speed: '스피드',
};

const ORDINAL_KEYS: Set<SortKey> = new Set(['dexNumber', 'name']);

type SortOptionItem = SortOption & { label: string; value: string };

const SORT_OPTIONS: SortOptionItem[] = SORT_KEY_LIST.flatMap((key) => {
  const name = SORT_KEY_LABELS[key];
  const isOrdinal = ORDINAL_KEYS.has(key);

  return [
    {
      key,
      direction: isOrdinal ? 'asc' : 'desc',
      label: isOrdinal ? `${name} 순서` : `${name} 높은 순`,
      value: `${key}-${isOrdinal ? 'asc' : 'desc'}`,
    },
    {
      key,
      direction: isOrdinal ? 'desc' : 'asc',
      label: isOrdinal ? `${name} 반대 순서` : `${name} 낮은 순`,
      value: `${key}-${isOrdinal ? 'desc' : 'asc'}`,
    },
  ] satisfies SortOptionItem[];
});

const getSortOptions = () => [...SORT_OPTIONS];

const DEFAULT_SORT: SortOption = { key: 'dexNumber', direction: 'asc' };

const getSortLabel = (sort: SortOption): string => {
  const found = SORT_OPTIONS.find(
    (o) => o.key === sort.key && o.direction === sort.direction,
  );

  return found?.label ?? '';
};

const isDefaultSort = (sort: SortOption): boolean =>
  sort.key === DEFAULT_SORT.key && sort.direction === DEFAULT_SORT.direction;

export {
  isSortKey,
  getComparator,
  getSortLabel,
  isDefaultSort,
  getSortOptions,
  DEFAULT_SORT,
  type SortKey,
  type Direction,
  type SortOption,
  type SortOptionItem,
};
