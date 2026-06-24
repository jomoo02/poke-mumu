import { type NationalPoke } from '../index';

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

/**
 * 결정성을 위한 최종 tie-breaker.
 * dexNumber → sortOrder 순. 항상 ascending.
 * 같은 species 내에서는 sortOrder가 form 순서를 결정 (base → mega → variant).
 */
const tieBreaker = (a: NationalPoke, b: NationalPoke): number => {
  const dexDiff = a.dexNumber - b.dexNumber;
  if (dexDiff !== 0) return dexDiff;
  return a.sortOrder - b.sortOrder;
};

/**
 * 1차 정렬키가 같을 때 tie-breaker로 풀어주는 wrapper.
 * direction이 desc여도 tie-breaker는 항상 asc로 적용 (안정성).
 */
const withTieBreaker =
  (compare: (a: NationalPoke, b: NationalPoke) => number) =>
  (a: NationalPoke, b: NationalPoke): number => {
    const primary = compare(a, b);
    if (primary !== 0) return primary;
    return tieBreaker(a, b);
  };

const RAW_COMPARATORS: Record<
  SortKey,
  (a: NationalPoke, b: NationalPoke) => number
> = {
  dexNumber: (a, b) => a.dexNumber - b.dexNumber,
  name: (a, b) => String(a.nameKo).localeCompare(String(b.nameKo)),
  hp: (a, b) => a.hp - b.hp,
  attack: (a, b) => a.attack - b.attack,
  defense: (a, b) => a.defense - b.defense,
  specialAttack: (a, b) => a.specialAttack - b.specialAttack,
  specialDefense: (a, b) => a.specialDefense - b.specialDefense,
  speed: (a, b) => a.speed - b.speed,
  total: (a, b) => (a.total ?? 0) - (b.total ?? 0),
};

const COMPARATORS: Record<
  SortKey,
  (a: NationalPoke, b: NationalPoke) => number
> = Object.fromEntries(
  Object.entries(RAW_COMPARATORS).map(([key, fn]) => [key, withTieBreaker(fn)]),
) as typeof RAW_COMPARATORS;

const getComparator = (key: SortKey) => COMPARATORS[key];

type SortOptionItem = SortOption & { label: string; value: string };

const SORT_OPTIONS: SortOptionItem[] = [
  {
    key: 'dexNumber',
    direction: 'asc',
    label: '도감번호 순',
    value: 'dexNumber-asc',
  },
  {
    key: 'dexNumber',
    direction: 'desc',
    label: '도감번호 반대 순',
    value: 'dexNumber-desc',
  },
  {
    key: 'total',
    direction: 'desc',
    label: '총합 높은 순',
    value: 'total-desc',
  },
  { key: 'total', direction: 'asc', label: '총합 낮은 순', value: 'total-asc' },

  { key: 'hp', direction: 'desc', label: 'HP 높은 순', value: 'hp-desc' },
  { key: 'hp', direction: 'asc', label: 'HP 낮은 순', value: 'hp-asc' },

  {
    key: 'attack',
    direction: 'desc',
    label: '공격 높은 순',
    value: 'attack-desc',
  },
  {
    key: 'attack',
    direction: 'asc',
    label: '공격 낮은 순',
    value: 'attack-asc',
  },

  {
    key: 'defense',
    direction: 'desc',
    label: '방어 높은 순',
    value: 'defense-desc',
  },
  {
    key: 'defense',
    direction: 'asc',
    label: '방어 낮은 순',
    value: 'defense-asc',
  },

  {
    key: 'specialAttack',
    direction: 'desc',
    label: '특수공격 높은 순',
    value: 'specialAttack-desc',
  },
  {
    key: 'specialAttack',
    direction: 'asc',
    label: '특수공격 낮은 순',
    value: 'specialAttack-asc',
  },

  {
    key: 'specialDefense',
    direction: 'desc',
    label: '특수방어 높은 순',
    value: 'specialDefense-desc',
  },
  {
    key: 'specialDefense',
    direction: 'asc',
    label: '특수방어 낮은 순',
    value: 'specialDefense-asc',
  },

  {
    key: 'speed',
    direction: 'desc',
    label: '스피드 높은 순',
    value: 'speed-desc',
  },
  {
    key: 'speed',
    direction: 'asc',
    label: '스피드 낮은 순',
    value: 'speed-asc',
  },

  { key: 'name', direction: 'asc', label: '이름순', value: 'name-asc' },
  { key: 'name', direction: 'desc', label: '이름 역순', value: 'name-desc' },
];

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
