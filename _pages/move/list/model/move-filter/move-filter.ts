import type { Move } from '@/_entities/move';
import { SELECTABLE_TYPE_IDENTIFIERS } from '@/_entities/type';

import { FILTERABLE_DAMAGE_CLASSES } from './option';
import type { FilterGroupName } from '../../config/move-list';

interface MoveFilter {
  // 그룹 안은 고른 순서 (트리거는 첫 값을 보여준다)
  types: string[];
  damageClasses: string[];
}

// URL 값(그룹별 배열)
type MoveFilterParams = Record<FilterGroupName, readonly string[]>;

// 유효한 identifier만 중복 없이 고른 순서대로
const pickValid = (
  values: readonly string[],
  valid: readonly string[],
): string[] =>
  values.filter(
    (value, index) => values.indexOf(value) === index && valid.includes(value),
  );

// URL 값을 유효한 선택으로. 키가 코드로 정해져 있어 모르는 그룹은 들어오지 않는다
const parseMoveFilter = ({
  type,
  damageClass,
}: MoveFilterParams): MoveFilter => ({
  types: pickValid(type, SELECTABLE_TYPE_IDENTIFIERS),
  damageClasses: pickValid(damageClass, FILTERABLE_DAMAGE_CLASSES),
});

/**
 * 같은 필터 안에서는 OR, 타입과 분류 사이는 AND. 선택이 비면 조건 없음.
 * 분류 필터가 켜지면 분류가 없는 Z·다이맥스 기술은 빠진다.
 */
const filterMoves = (
  moves: Move[],
  { types, damageClasses }: MoveFilter,
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

export type { MoveFilter, MoveFilterParams };

export { parseMoveFilter, filterMoves };
