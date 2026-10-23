import { STAT_KEYS, type BaseStatsPoke } from '../base-stats-poke';
import {
  getLocalizedName,
  type NameLanguage,
} from '../name-language/name-language';

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

// 이름순 정렬 규칙 (CLDR). 고른 이름 언어의 규칙으로 비교한다
const NAME_COLLATOR: Record<NameLanguage, Intl.Collator> = {
  // 숫자 → 한글 → 영어
  ko: new Intl.Collator('ko', { numeric: true }),
  // 대소문자·악센트 무시 (Flabébé = Flabebe)
  en: new Intl.Collator('en', { numeric: true, sensitivity: 'base' }),
  // 오십음도 순
  ja: new Intl.Collator('ja', { numeric: true }),
};

// 한 기준으로 오름차순 비교. 같은 번호·이름의 폼끼리는 0 (순서는 sortPokes의 동점 처리가 정한다)
const compareBy = (
  a: BaseStatsPoke,
  b: BaseStatsPoke,
  sort: SortKey,
  language: NameLanguage,
): number => {
  switch (sort) {
    case 'dexNumber':
      return a.dexNumber - b.dexNumber;
    case 'name':
      return NAME_COLLATOR[language].compare(
        getLocalizedName(a, language),
        getLocalizedName(b, language),
      );
    default:
      return a.stats[sort] - b.stats[sort];
  }
};

// 기본 정렬 순서: 도감 번호 → 같은 번호 안의 폼 순서
const compareDexOrder = (a: BaseStatsPoke, b: BaseStatsPoke) =>
  a.dexNumber - b.dexNumber || a.sortOrder - b.sortOrder;

// 고른 기준으로 정렬하고, 값이 같으면 기본 정렬(도감 번호 → 폼) 순서로.
// 동점 순서도 방향을 따라 뒤집는다: 반대 방향은 정확히 거꾸로 된 목록이다
// (스피드 높은 순이면 같은 스피드끼리는 번호 반대순, 번호 반대순이면 같은 번호의 폼도 거꾸로)
const sortPokes = (
  pokes: readonly BaseStatsPoke[],
  { sort, order }: PokeSort,
  language: NameLanguage = 'ko',
): BaseStatsPoke[] => {
  const direction = order === 'asc' ? 1 : -1;

  return [...pokes].sort(
    (a, b) =>
      (compareBy(a, b, sort, language) || compareDexOrder(a, b)) * direction,
  );
};

export type { SortKey, SortOrder, PokeSort };

export { SORT_KEYS, SORT_ORDERS, DEFAULT_SORT, isSameSort, sortPokes };
