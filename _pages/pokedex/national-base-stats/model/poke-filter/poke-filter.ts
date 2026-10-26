import type { Facet } from '@/_shared/lib/facet-param';

import type { BaseStatsPoke } from '../base-stats-poke';
import {
  POKE_FILTER_GROUPS,
  POKE_FILTER_RULES,
  type PokeFilterGroup,
  type PokeFilterOptions,
} from './filter-option';

type PokeFilterValues = Record<PokeFilterGroup, string[]>;

interface PokeFilter {
  // 유효한 선택 전체를 고른 순서대로 (트리거는 그룹별 첫 값을 보여준다)
  selections: Facet[];
  byGroup: PokeFilterValues;
}

// 그룹을 추가하면 여기도 늘려야 tsc가 통과(Record)
const emptyValues = (): PokeFilterValues => ({ type: [], form: [], gen: [] });

// URL 그룹 이름은 사용자 입력이라 객체 키로 찾지 않고 목록에서 확인한다 (constructor 같은 키 방지)
const isPokeFilterGroup = (group: string): group is PokeFilterGroup =>
  (POKE_FILTER_GROUPS as readonly string[]).includes(group);

/**
 * URL 선택 중 아는 그룹의, 선택지에 있는 값만 중복 없이 고른 순서대로 남긴다.
 * 그룹의 최대 선택 수를 넘으면 나중에 고른 것부터 버린다
 */
const parsePokeFilter = (
  facets: readonly Facet[],
  options: PokeFilterOptions,
): PokeFilter => {
  const seen = new Set<string>();
  const byGroup = emptyValues();

  const selections = facets.filter(({ group, value }) => {
    if (!isPokeFilterGroup(group)) {
      return false;
    }

    const id = `${group}.${value}`;
    const max = POKE_FILTER_RULES[group].max ?? Infinity;

    if (
      seen.has(id) ||
      byGroup[group].length >= max ||
      !options[group].some((option) => option.value === value)
    ) {
      return false;
    }

    seen.add(id);
    byGroup[group].push(value);
    return true;
  });

  return { selections, byGroup };
};

// 그룹 하나의 조건: 고른 게 없으면 통과. all은 모두 가짐(AND), any는 하나라도 가짐(OR)
const matchesGroup = (
  poke: BaseStatsPoke,
  group: PokeFilterGroup,
  selected: readonly string[],
): boolean => {
  if (selected.length === 0) {
    return true;
  }

  const { match, getPokeValues } = POKE_FILTER_RULES[group];
  const values = getPokeValues(poke);

  return match === 'all'
    ? selected.every((value) => values.includes(value))
    : selected.some((value) => values.includes(value));
};

// 모든 그룹의 조건을 만족하는 포켓몬만 남긴다 (그룹 사이 AND). 고른 게 없으면 그대로
const filterPokes = (
  pokes: BaseStatsPoke[],
  byGroup: PokeFilterValues,
): BaseStatsPoke[] => {
  const activeGroups = POKE_FILTER_GROUPS.filter(
    (group) => byGroup[group].length > 0,
  );

  if (activeGroups.length === 0) {
    return pokes;
  }

  return pokes.filter((poke) =>
    activeGroups.every((group) => matchesGroup(poke, group, byGroup[group])),
  );
};

export type { PokeFilter, PokeFilterValues };

export { parsePokeFilter, filterPokes };
