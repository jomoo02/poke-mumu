import {
  DAMAGE_CLASS_IDENTIFIERS,
  type DamageClass,
} from '@/_entities/damage-class';

// 분류 필터에서 고를 수 있는 값 (게임 표시 순서).
// 선택지(toFilterDamageClasses)와 URL 검증(parseMoveFilter)이 함께 쓰는 기준.
// 타입은 entity의 SELECTABLE_TYPE_IDENTIFIERS·toSelectableTypes를 쓴다
const FILTERABLE_DAMAGE_CLASSES: readonly string[] = DAMAGE_CLASS_IDENTIFIERS;

// 목록에 있는 것만 목록 순서대로 (모르는 identifier는 빠진다)
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

// 분류 필터 선택지: DB id 순서가 아닌 게임 표시 순서(물리 → 특수 → 변화)로
const toFilterDamageClasses = (
  damageClasses: readonly DamageClass[],
): DamageClass[] => pickFilterable(damageClasses, FILTERABLE_DAMAGE_CLASSES);

export { FILTERABLE_DAMAGE_CLASSES, toFilterDamageClasses };
