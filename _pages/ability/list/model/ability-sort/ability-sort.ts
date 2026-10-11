import type { AbilityDetail } from '@/_entities/ability';

const SORT_KEYS = ['abilityNumber', 'name', 'appearance'] as const;

type SortKey = (typeof SORT_KEYS)[number];

const SORT_ORDERS = ['asc', 'desc'] as const;

type SortOrder = (typeof SORT_ORDERS)[number];

interface AbilitySort {
  sort: SortKey;
  order: SortOrder;
}

// 게임 공식 번호순. 기본값은 URL에 쓰지 않는다
const DEFAULT_SORT: AbilitySort = { sort: 'abilityNumber', order: 'asc' };

const isSameSort = (a: AbilitySort, b: AbilitySort) =>
  a.sort === b.sort && a.order === b.order;

// 한국어 정렬 규칙(CLDR): 숫자 → 한글 → 영어.
// numeric: 숫자를 글자가 아닌 값으로 비교한다
const koCollator = new Intl.Collator('ko', { numeric: true });

// 등장 순서 기준값. 챔피언스 특성은 해당 세대에 속하지만 같은 세대의 일반 특성 뒤에 둔다
// (asc: 9세대 → 챔피언스, desc: 챔피언스 → 9세대 → 8세대)
const getAppearanceRank = ({ gen, isChampions }: AbilityDetail) =>
  gen * 2 + (isChampions ? 1 : 0);

// 한 기준으로 비교
const compareBy = (
  a: AbilityDetail,
  b: AbilityDetail,
  { sort, order }: AbilitySort,
): number => {
  const direction = order === 'asc' ? 1 : -1;

  switch (sort) {
    case 'abilityNumber':
      return (a.abilityNumber - b.abilityNumber) * direction;
    case 'name':
      return koCollator.compare(a.nameKo, b.nameKo) * direction;
    case 'appearance':
      return (getAppearanceRank(a) - getAppearanceRank(b)) * direction;
  }
};

// 고른 기준으로 정렬하고, 값이 같으면 기본 정렬(DEFAULT_SORT) 순서로.
// 동점 순서는 방향을 따라 뒤집지 않는다 (등장 역순이어도 같은 세대끼리는 번호순)
const sortAbilities = (
  abilities: readonly AbilityDetail[],
  sortState: AbilitySort,
): AbilityDetail[] =>
  [...abilities].sort(
    (a, b) => compareBy(a, b, sortState) || compareBy(a, b, DEFAULT_SORT),
  );

export type { SortKey, SortOrder, AbilitySort };

export { SORT_KEYS, SORT_ORDERS, DEFAULT_SORT, isSameSort, sortAbilities };
