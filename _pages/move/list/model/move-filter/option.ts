import { TYPE_IDENTIFIERS, type Type, type TypeDetail } from '@/_entities/type';
import {
  DAMAGE_CLASS_IDENTIFIERS,
  type DamageClass,
} from '@/_entities/damage-class';

// 기술 필터에서 고를 수 있는 값 (게임 표시 순서).
// 선택지(toFilterTypes·toFilterDamageClasses)와 URL 검증(parseMoveFilter)이 함께 쓰는 기준
// 기술에는 unknown 타입이 없어 뺀다
const FILTERABLE_TYPES: readonly string[] = TYPE_IDENTIFIERS.filter(
  (identifier) => identifier !== 'unknown',
);

const FILTERABLE_DAMAGE_CLASSES: readonly string[] = DAMAGE_CLASS_IDENTIFIERS;

// 목록에 있는 것만 목록 순서대로 (모르는 identifier·unknown은 빠진다)
const pickFilterable = <T extends { identifier: string }>(
  items: readonly T[],
  filterable: readonly string[],
): T[] =>
  items
    .filter(({ identifier }) => filterable.includes(identifier))
    .sort(
      (a, b) =>
        filterable.indexOf(a.identifier) - filterable.indexOf(b.identifier),
    );

// 타입 필터 선택지. 클라이언트로 넘기는 값이라 필터에 필요한 필드만 남긴다
const toFilterTypes = (types: readonly TypeDetail[]): Type[] =>
  pickFilterable(types, FILTERABLE_TYPES).map(({ id, identifier, nameKo }) => ({
    id,
    identifier,
    nameKo,
  }));

// 분류 필터 선택지: DB id 순서가 아닌 게임 표시 순서(물리 → 특수 → 변화)로
const toFilterDamageClasses = (
  damageClasses: readonly DamageClass[],
): DamageClass[] => pickFilterable(damageClasses, FILTERABLE_DAMAGE_CLASSES);

export {
  FILTERABLE_TYPES,
  FILTERABLE_DAMAGE_CLASSES,
  toFilterTypes,
  toFilterDamageClasses,
};
