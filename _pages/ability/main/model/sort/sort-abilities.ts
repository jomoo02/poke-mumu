import type { ListAbility } from '../ability';

const SORT_KEYS = ['name', 'appearance'] as const;

type SortKey = (typeof SORT_KEYS)[number];

const SORT_ORDERS = ['asc', 'desc'] as const;

type SortOrder = (typeof SORT_ORDERS)[number];

interface AbilitySort {
  sort: SortKey;
  order: SortOrder;
}

// 이름순. 기본값은 URL에 쓰지 않는다
const DEFAULT_SORT: AbilitySort = { sort: 'name', order: 'asc' };

const isSameSort = (a: AbilitySort, b: AbilitySort) =>
  a.sort === b.sort && a.order === b.order;

// 이름순 정렬 규칙 (CLDR): 숫자 → 한글 → 영어
const NAME_COLLATOR = new Intl.Collator('ko', { numeric: true });

// 등장 순서 기준값. 챔피언스 특성은 해당 세대에 속하지만 같은 세대의 일반 특성 뒤에 둔다
// (asc: 9세대 → 챔피언스, desc: 챔피언스 → 9세대 → 8세대)
const getAppearanceRank = ({ gen, isChampions }: ListAbility) =>
  gen * 2 + (isChampions ? 1 : 0);

// 한 기준으로 오름차순 비교
const compareBy = (a: ListAbility, b: ListAbility, sort: SortKey): number => {
  switch (sort) {
    case 'name':
      return NAME_COLLATOR.compare(a.nameKo, b.nameKo);
    case 'appearance':
      return getAppearanceRank(a) - getAppearanceRank(b);
  }
};

// 고른 기준으로 정렬하고, 값이 같으면 특성 번호순으로 (번호는 화면에 없지만 동점 순서를 고정한다).
// 동점 순서도 방향을 따라 뒤집는다: 반대 방향은 정확히 거꾸로 된 목록이다
// (등장 반대순이면 같은 세대끼리는 번호 반대순)
const sortAbilities = (
  abilities: readonly ListAbility[],
  { sort, order }: AbilitySort,
): ListAbility[] => {
  const direction = order === 'asc' ? 1 : -1;

  return [...abilities].sort(
    (a, b) =>
      (compareBy(a, b, sort) || a.abilityNumber - b.abilityNumber) * direction,
  );
};

export type { SortKey, SortOrder, AbilitySort };

export { SORT_KEYS, SORT_ORDERS, DEFAULT_SORT, isSameSort, sortAbilities };
