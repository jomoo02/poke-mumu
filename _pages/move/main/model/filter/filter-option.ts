import {
  DAMAGE_CLASS_IDENTIFIERS,
  type DamageClass,
} from '@/_entities/damage-class';
import {
  toSelectableTypes,
  type Type,
  type TypeDetail,
} from '@/_entities/type';

import type { ListMove } from '../move';

// 필터 그룹. 이름이 곧 URL 키다 (?type=fire,grass&damageClass=physical). 배열 순서가 필터 줄의 순서
const MOVE_FILTER_GROUPS = ['type', 'damageClass'] as const;

type MoveFilterGroup = (typeof MOVE_FILTER_GROUPS)[number];

// 그룹마다 값을 만든다. 그룹별 Record(URL 키·해석·초기화)는 모두 이것으로 만들어
// 그룹을 추가하면 따라온다 (Object.fromEntries는 키 타입을 잃어 여기서만 단언한다)
const mapFilterGroups = <T>(
  fn: (group: MoveFilterGroup) => T,
): Record<MoveFilterGroup, T> =>
  Object.fromEntries(
    MOVE_FILTER_GROUPS.map((group) => [group, fn(group)]),
  ) as Record<MoveFilterGroup, T>;

// 선택지 하나. 출처(코드·DB)와 상관없이 같은 모양으로 클라이언트에 넘긴다
interface MoveFilterOption {
  value: string;
  label: string;
  // 타입 선택지만: 아이콘을 그릴 타입
  type?: Type;
  // 분류 선택지만: 아이콘을 그릴 분류
  damageClass?: DamageClass;
}

// 그룹별 선택지. 배열 순서가 화면 순서, 이 목록에 있는 값만 URL에서 유효
type MoveFilterOptions = Record<MoveFilterGroup, readonly MoveFilterOption[]>;

interface MoveFilterRule {
  // 기술이 가진 값. 그룹 안은 하나라도 가지면 통과(OR)
  getMoveValues: (move: ListMove) => readonly string[];
}

// 그룹 사이는 AND (불꽃 + 특수 → 불꽃 타입인 특수 기술)
const MOVE_FILTER_RULES: Record<MoveFilterGroup, MoveFilterRule> = {
  // 기술은 타입이 하나라 여러 개를 고르면 그중 하나인 기술 (불꽃 + 물 → 불꽃 또는 물)
  type: {
    getMoveValues: (move) => [move.type.identifier],
  },
  // Z·다이맥스 기술은 분류가 없어 [] → 분류를 고르면 빠진다
  damageClass: {
    getMoveValues: (move) =>
      move.damageClass ? [move.damageClass.identifier] : [],
  },
};

// 고를 수 있는 타입(unknown 제외)만 게임 표시 순서로
const toTypeOptions = (types: readonly TypeDetail[]): MoveFilterOption[] =>
  toSelectableTypes(types).map((type) => ({
    value: type.identifier,
    label: type.nameKo,
    type,
  }));

// DB id 순서가 아닌 게임 표시 순서(물리 → 특수 → 변화). 모르는 분류는 뺀다
const toDamageClassOptions = (
  damageClasses: readonly DamageClass[],
): MoveFilterOption[] =>
  DAMAGE_CLASS_IDENTIFIERS.flatMap((identifier) => {
    const damageClass = damageClasses.find(
      (item) => item.identifier === identifier,
    );

    return damageClass
      ? [{ value: identifier, label: damageClass.nameKo, damageClass }]
      : [];
  });

// 서버(page)에서 출처별 선택지를 같은 모양으로 모은다. 이름은 DB, 순서는 코드
const toMoveFilterOptions = (
  types: readonly TypeDetail[],
  damageClasses: readonly DamageClass[],
): MoveFilterOptions => ({
  type: toTypeOptions(types),
  damageClass: toDamageClassOptions(damageClasses),
});

export type {
  MoveFilterGroup,
  MoveFilterOption,
  MoveFilterOptions,
  MoveFilterRule,
};

export {
  MOVE_FILTER_GROUPS,
  MOVE_FILTER_RULES,
  mapFilterGroups,
  toMoveFilterOptions,
};
