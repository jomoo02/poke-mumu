import type { AbilityDetail } from '@/_entities/ability';

const SORT_KEYS = ['name', 'appearance'] as const;

type SortKey = (typeof SORT_KEYS)[number];

const SORT_ORDERS = ['asc', 'desc'] as const;

type SortOrder = (typeof SORT_ORDERS)[number];

interface AbilitySort {
  sort: SortKey;
  order: SortOrder;
}

const DEFAULT_SORT: AbilitySort = { sort: 'name', order: 'asc' };

const isSameSort = (a: AbilitySort, b: AbilitySort) => {
  return a.sort === b.sort && a.order === b.order;
};

const koCollator = new Intl.Collator('ko');

const compareNameKo = (a: AbilityDetail, b: AbilityDetail) =>
  koCollator.compare(a.nameKo, b.nameKo);

// 등장 순서 기준값. 챔피언스 특성은 해당 세대에 속하지만 같은 세대의 일반 특성 뒤에 둔다
// (asc: 9세대 → 챔피언스, desc: 챔피언스 → 9세대 → 8세대)
const getAppearanceRank = ({ gen, isChampions }: AbilityDetail) =>
  gen * 2 + (isChampions ? 1 : 0);

const sortAbilities = (
  abilities: readonly AbilityDetail[],
  { sort, order }: AbilitySort,
): AbilityDetail[] => {
  const direction = order === 'asc' ? 1 : -1;

  return [...abilities].sort((a, b) => {
    if (sort === 'appearance') {
      // 같은 순위 안에서는 방향과 무관하게 가나다순
      return (
        (getAppearanceRank(a) - getAppearanceRank(b)) * direction ||
        compareNameKo(a, b)
      );
    }
    return compareNameKo(a, b) * direction;
  });
};

export type { SortKey, SortOrder, AbilitySort };

export { SORT_KEYS, SORT_ORDERS, DEFAULT_SORT, isSameSort, sortAbilities };
