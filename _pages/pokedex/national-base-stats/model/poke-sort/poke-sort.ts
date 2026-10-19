import { STAT_KEYS, type BaseStatsPoke } from '../base-stats-poke';

const SORT_KEYS = ['dexNumber', 'name', ...STAT_KEYS] as const;

type SortKey = (typeof SORT_KEYS)[number];

const SORT_ORDERS = ['asc', 'desc'] as const;

type SortOrder = (typeof SORT_ORDERS)[number];

interface PokeSort {
  sort: SortKey;
  order: SortOrder;
}

// 도감 번호순. 기본값은 URL에 쓰지 않는다
const DEFAULT_SORT: PokeSort = { sort: 'dexNumber', order: 'asc' };

const isSameSort = (a: PokeSort, b: PokeSort) =>
  a.sort === b.sort && a.order === b.order;

// 한국어 정렬 규칙(CLDR): 숫자 → 한글 → 영어
const koCollator = new Intl.Collator('ko', { numeric: true });

// 한 기준으로 비교. 같은 번호·이름의 폼끼리는 0 (순서는 sortPokes의 동점 처리가 정한다)
const compareBy = (
  a: BaseStatsPoke,
  b: BaseStatsPoke,
  { sort, order }: PokeSort,
): number => {
  const direction = order === 'asc' ? 1 : -1;

  switch (sort) {
    case 'dexNumber':
      return (a.dexNumber - b.dexNumber) * direction;
    case 'name':
      return koCollator.compare(a.nameKo, b.nameKo) * direction;
    default:
      return (a.stats[sort] - b.stats[sort]) * direction;
  }
};

// 기본 정렬 순서: 도감 번호 → 같은 번호 안의 폼 순서
const compareDexOrder = (a: BaseStatsPoke, b: BaseStatsPoke) =>
  a.dexNumber - b.dexNumber || a.sortOrder - b.sortOrder;

// 고른 기준으로 정렬하고, 값이 같으면 기본 정렬(도감 번호 → 폼) 순서로.
// 동점 순서는 방향을 따라 뒤집지 않는다 (스피드 높은 순이어도 같은 스피드끼리는 번호순,
// 번호 역순이어도 같은 번호의 폼끼리는 기본 폼부터)
const sortPokes = (
  pokes: readonly BaseStatsPoke[],
  sortState: PokeSort,
): BaseStatsPoke[] =>
  [...pokes].sort(
    (a, b) => compareBy(a, b, sortState) || compareDexOrder(a, b),
  );

export type { SortKey, SortOrder, PokeSort };

export { SORT_KEYS, SORT_ORDERS, DEFAULT_SORT, isSameSort, sortPokes };
