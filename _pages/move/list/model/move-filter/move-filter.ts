import { TYPE_IDENTIFIERS } from '@/_entities/type';
import { DAMAGE_CLASS_IDENTIFIERS } from '@/_entities/damage-class';
import type { Move } from '@/_entities/move';

interface MoveFilter {
  types: string[];
  damageClasses: string[];
}

// 기술에는 unknown 타입이 없어 필터 선택지에서도 뺀다
const FILTERABLE_TYPES: readonly string[] = TYPE_IDENTIFIERS.filter(
  (identifier) => identifier !== 'unknown',
);

const FILTERABLE_DAMAGE_CLASSES: readonly string[] = DAMAGE_CLASS_IDENTIFIERS;

// URL 값 중 유효한 identifier만 중복 없이 남긴다
const pickValid = (raw: readonly string[], valid: readonly string[]) =>
  [...new Set(raw)].filter((value) => valid.includes(value));

const parseMoveFilter = (
  rawTypes: readonly string[],
  rawDamageClasses: readonly string[],
): MoveFilter => ({
  types: pickValid(rawTypes, FILTERABLE_TYPES),
  damageClasses: pickValid(rawDamageClasses, FILTERABLE_DAMAGE_CLASSES),
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

export type { MoveFilter };

export { parseMoveFilter, filterMoves };
