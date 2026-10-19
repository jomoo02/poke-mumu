'use client';

import { useQueryStates } from 'nuqs';

import { STAT_KEYS } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { PokeSort } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import { pokeSearchParams } from '@/_pages/pokedex/national-base-stats/model/search-params';

/*
 * 정렬 메뉴 선택지: 순서형은 방향까지 이름에 담고, 능력치는 '능력치순' 하나로 묶는다.
 * 능력치순을 고르면 종족값 높은 순으로 시작하고, 어떤 능력치·방향인지는 표 머리글에서 고른다
 */
const MODE_SORT_OPTIONS = [
  {
    key: 'dexNumber-asc',
    label: '도감번호순',
    sort: { sort: 'dexNumber', order: 'asc' },
  },
  {
    key: 'dexNumber-desc',
    label: '도감번호 역순',
    sort: { sort: 'dexNumber', order: 'desc' },
  },
  { key: 'name-asc', label: '이름순', sort: { sort: 'name', order: 'asc' } },
  {
    key: 'name-desc',
    label: '이름 역순',
    sort: { sort: 'name', order: 'desc' },
  },
  { key: 'stat', label: '능력치순', sort: { sort: 'total', order: 'desc' } },
] as const satisfies readonly {
  key: string;
  label: string;
  sort: PokeSort;
}[];

type ModeSortKey = (typeof MODE_SORT_OPTIONS)[number]['key'];

const PARSERS = {
  sort: pokeSearchParams.sort,
  order: pokeSearchParams.order,
};

const isStatKey = (sort: string) =>
  (STAT_KEYS as readonly string[]).includes(sort);

export function useModeSort() {
  const [{ sort, order }, setParams] = useQueryStates(PARSERS);

  // 능력치(종족값 포함) 중 하나로 정렬 중인지 = 표 머리글을 보여 줄지
  const isStatSort = isStatKey(sort);

  const selectedKey: ModeSortKey = isStatSort
    ? 'stat'
    : sort === 'name'
      ? order === 'asc'
        ? 'name-asc'
        : 'name-desc'
      : order === 'asc'
        ? 'dexNumber-asc'
        : 'dexNumber-desc';

  const select = (key: ModeSortKey) => {
    // 이미 능력치순이면 고른 능력치를 그대로 둔다
    if (key === selectedKey) {
      return;
    }

    const option = MODE_SORT_OPTIONS.find((item) => item.key === key);
    if (option) {
      setParams(option.sort);
    }
  };

  return { selectedKey, isStatSort, select };
}

export type { ModeSortKey };

export { MODE_SORT_OPTIONS };
