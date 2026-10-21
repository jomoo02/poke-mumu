import type { Facet } from '@/_shared/lib/facet-param';
import { getPokeTypes } from '@/_entities/poke';

import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import { FILTERABLE_TYPES } from './option';
import {
  FILTER_GROUP,
  MAX_TYPE_SELECTION,
} from '../../config/national-base-stats';

interface PokeFilter {
  types: string[];
  // 유효한 선택을 고른 순서대로 (트리거는 그룹별 첫 값을 보여준다)
  selections: Facet[];
}

// URL 그룹 이름은 사용자 입력이라 객체 대신 Map으로 찾는다 (constructor 같은 키 방지)
const VALID_VALUES = new Map<string, readonly string[]>([
  [FILTER_GROUP.type, FILTERABLE_TYPES],
]);

// 그룹별 최대 선택 수. 넘친 값은 나중에 고른 것부터 버린다
const MAX_SELECTION = new Map<string, number>([
  [FILTER_GROUP.type, MAX_TYPE_SELECTION],
]);

// URL 선택 중 아는 그룹의 유효한 identifier만 중복 없이, 고른 순서대로, 최대 수까지 남긴다
const parsePokeFilter = (facets: readonly Facet[]): PokeFilter => {
  const seen = new Set<string>();
  const counts = new Map<string, number>();

  const selections = facets.filter(({ group, value }) => {
    const id = `${group}.${value}`;
    const count = counts.get(group) ?? 0;

    if (
      seen.has(id) ||
      !VALID_VALUES.get(group)?.includes(value) ||
      count >= (MAX_SELECTION.get(group) ?? Infinity)
    ) {
      return false;
    }

    seen.add(id);
    counts.set(group, count + 1);
    return true;
  });

  return {
    types: selections
      .filter((facet) => facet.group === FILTER_GROUP.type)
      .map(({ value }) => value),
    selections,
  };
};

/**
 * 고른 타입을 모두 가진 포켓몬만 남긴다(AND). 선택이 비면 조건 없음.
 * 불꽃 + 비행 → 불꽃/비행 복합 타입 (기술 목록의 OR와 다르다: 포켓몬은 타입 조합으로 찾는다)
 */
const filterPokes = (
  pokes: BaseStatsPoke[],
  { types }: Pick<PokeFilter, 'types'>,
): BaseStatsPoke[] => {
  if (types.length === 0) {
    return pokes;
  }

  return pokes.filter((poke) => {
    const pokeTypes = getPokeTypes(poke).map(({ identifier }) => identifier);

    return types.every((type) => pokeTypes.includes(type));
  });
};

export type { PokeFilter };

export { parsePokeFilter, filterPokes };
