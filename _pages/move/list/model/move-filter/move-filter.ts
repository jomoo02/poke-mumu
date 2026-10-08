import type { Move } from '@/_entities/move';
import type { Facet } from '@/_shared/lib/facet-param';

import { FILTERABLE_DAMAGE_CLASSES, FILTERABLE_TYPES } from './option';
import { FILTER_GROUP } from '../../config/move-list';

interface MoveFilter {
  types: string[];
  damageClasses: string[];
  // 유효한 선택을 고른 순서대로 (트리거는 그룹별 첫 값을 보여준다)
  selections: Facet[];
}

// URL 그룹 이름은 사용자 입력이라 객체 대신 Map으로 찾는다 (constructor 같은 키 방지)
const VALID_VALUES = new Map<string, readonly string[]>([
  [FILTER_GROUP.type, FILTERABLE_TYPES],
  [FILTER_GROUP.damageClass, FILTERABLE_DAMAGE_CLASSES],
]);

// URL 선택 중 아는 그룹의 유효한 identifier만 중복 없이, 고른 순서대로 남긴다
const parseMoveFilter = (facets: readonly Facet[]): MoveFilter => {
  const seen = new Set<string>();

  const selections = facets.filter(({ group, value }) => {
    const id = `${group}.${value}`;

    if (seen.has(id) || !VALID_VALUES.get(group)?.includes(value)) {
      return false;
    }

    seen.add(id);
    return true;
  });

  const valuesOf = (group: string) =>
    selections
      .filter((facet) => facet.group === group)
      .map(({ value }) => value);

  return {
    types: valuesOf(FILTER_GROUP.type),
    damageClasses: valuesOf(FILTER_GROUP.damageClass),
    selections,
  };
};

/**
 * 같은 필터 안에서는 OR, 타입과 분류 사이는 AND. 선택이 비면 조건 없음.
 * 분류 필터가 켜지면 분류가 없는 Z·다이맥스 기술은 빠진다.
 */
const filterMoves = (
  moves: Move[],
  { types, damageClasses }: Pick<MoveFilter, 'types' | 'damageClasses'>,
): Move[] => {
  if (types.length === 0 && damageClasses.length === 0) {
    return moves;
  }

  return moves.filter(
    (move) =>
      (types.length === 0 || types.includes(move.type.identifier)) &&
      (damageClasses.length === 0 ||
        (move.damageClass !== null &&
          damageClasses.includes(move.damageClass.identifier))),
  );
};

export type { MoveFilter };

export { parseMoveFilter, filterMoves };
