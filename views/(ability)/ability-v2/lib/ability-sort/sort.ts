import { Ability } from '@/entities/ability/model';

const SORT_KEYS = ['name', 'appearance'] as const;

type SortKey = (typeof SORT_KEYS)[number];

const SORT_DIRECTIONS = ['asc', 'desc'] as const;

type SortDirection = (typeof SORT_DIRECTIONS)[number];

interface AbilitySort {
  sort: SortKey;
  dir: SortDirection;
}
const RESET_KEYS = ['ability'];
const DEFAULT_SORT: AbilitySort = { sort: 'name', dir: 'asc' };

const SORT_OPTIONS: readonly AbilitySort[] = [
  { sort: 'name', dir: 'asc' },
  { sort: 'name', dir: 'desc' },
  { sort: 'appearance', dir: 'asc' },
  { sort: 'appearance', dir: 'desc' },
];

const SORT_LABELS: Record<SortKey, Record<SortDirection, string>> = {
  name: { asc: '이름 순서', desc: '이름 반대순서' },
  appearance: { asc: '등장 순서', desc: '등장 반대순서' },
};

const getSortLabel = ({ sort, dir }: AbilitySort) => {
  return SORT_LABELS[sort][dir];
};

const isSameSort = (a: AbilitySort, b: AbilitySort) => {
  return a.sort === b.sort && a.dir === b.dir;
};

const koCollator = new Intl.Collator('ko');

const compareNameKo = (a: Ability, b: Ability) =>
  koCollator.compare(a.nameKo, b.nameKo);

const sortAbilities = (
  abilities: Ability[],
  { sort, dir }: AbilitySort,
): Ability[] => {
  const direction = dir === 'asc' ? 1 : -1;

  return [...abilities].sort((a, b) => {
    if (sort === 'appearance') {
      // 같은 세대 안에서는 방향과 무관하게 가나다순
      return (a.gen - b.gen) * direction || compareNameKo(a, b);
    }
    return compareNameKo(a, b) * direction;
  });
};

export type { SortKey, SortDirection, AbilitySort };

export {
  SORT_KEYS,
  SORT_DIRECTIONS,
  DEFAULT_SORT,
  SORT_OPTIONS,
  SORT_LABELS,
  getSortLabel,
  isSameSort,
  sortAbilities,
  RESET_KEYS,
};
