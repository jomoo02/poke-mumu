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

/**
 * 결정성을 위한 최종 tie-breaker.
 * dexNumber → sortOrder 순. 항상 ascending.
 * 같은 species 내에서는 sortOrder가 form 순서를 결정 (base → mega → variant).
 */
const tieBreaker = (a: NationalPokeView, b: NationalPokeView): number => {
  const dexDiff = a.dexNumber - b.dexNumber;
  if (dexDiff !== 0) return dexDiff;
  return a.sortOrder - b.sortOrder;
};

/**
 * 1차 정렬키가 같을 때 tie-breaker로 풀어주는 wrapper.
 * direction이 desc여도 tie-breaker는 항상 asc로 적용 (안정성).
 */
const withTieBreaker =
  (compare: (a: NationalPokeView, b: NationalPokeView) => number) =>
  (a: NationalPokeView, b: NationalPokeView): number => {
    const primary = compare(a, b);
    if (primary !== 0) return primary;
    return tieBreaker(a, b);
  };

const RAW_COMPARATORS: Record<
  SortKey,
  (a: NationalPokeView, b: NationalPokeView) => number
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
  (a: NationalPokeView, b: NationalPokeView) => number
> = Object.fromEntries(
  Object.entries(RAW_COMPARATORS).map(([key, fn]) => [key, withTieBreaker(fn)]),
) as typeof RAW_COMPARATORS;

const getComparator = (key: SortKey) => COMPARATORS[key];

// ... (이하 SORT_KEY_LABELS, ORDINAL_KEYS, SORT_OPTIONS, DEFAULT_SORT 등은 변경 없음)
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
