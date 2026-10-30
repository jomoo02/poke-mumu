import { getPokeTypes } from '@/_entities/poke';
import {
  toSelectableTypes,
  type Type,
  type TypeDetail,
} from '@/_entities/type';

import type { BaseStatsPoke } from '../base-stats-poke';
import type { FormGroup } from '../form-group';

// 필터 그룹. 이름이 곧 URL 키다 (?type=fire,flying&form=alola&gen=1). 배열 순서가 필터 줄의 순서
const POKE_FILTER_GROUPS = ['type', 'form', 'gen'] as const;

type PokeFilterGroup = (typeof POKE_FILTER_GROUPS)[number];

// 그룹마다 값을 만든다. 그룹별 Record(URL 키·해석·초기화·체크박스)는 모두 이것으로 만들어
// 그룹을 추가하면 따라온다 (Object.fromEntries는 키 타입을 잃어 여기서만 단언한다)
const mapFilterGroups = <T>(
  fn: (group: PokeFilterGroup) => T,
): Record<PokeFilterGroup, T> =>
  Object.fromEntries(
    POKE_FILTER_GROUPS.map((group) => [group, fn(group)]),
  ) as Record<PokeFilterGroup, T>;

// 선택지 하나. 출처(코드·DB)와 상관없이 같은 모양으로 클라이언트에 넘긴다
interface PokeFilterOption {
  value: string;
  label: string;
  // 타입 선택지만: 아이콘을 그릴 타입
  type?: Type;
}

// 그룹별 선택지. 배열 순서가 화면 순서, 이 목록에 있는 값만 URL에서 유효
type PokeFilterOptions = Record<PokeFilterGroup, readonly PokeFilterOption[]>;

interface PokeFilterRule {
  // 그룹 안: all = 고른 값을 모두 가짐(AND), any = 하나라도 가짐(OR)
  match: 'all' | 'any';
  max?: number;
  getPokeValues: (poke: BaseStatsPoke) => readonly string[];
}

// 그룹 사이는 AND (불꽃 + 알로라의 모습 → 불꽃 타입인 알로라의 모습)
const POKE_FILTER_RULES: Record<PokeFilterGroup, PokeFilterRule> = {
  // 불꽃 + 비행 → 불꽃/비행 복합 타입. 포켓몬은 타입이 최대 2개라 그 이상 고르면 결과가 항상 빈다
  type: {
    match: 'all',
    max: 2,
    getPokeValues: (poke) =>
      getPokeTypes(poke).map(({ identifier }) => identifier),
  },
  // 모습 필터에 안 잡히는 폼·기본 모습은 [] → 모습을 고르면 빠진다
  form: {
    match: 'any',
    getPokeValues: (poke) => (poke.form?.group ? [poke.form.group] : []),
  },
  // 기본 모습만 세대가 있다 (폼은 null → 세대를 고르면 빠진다. 결정 문서 2026-10-23)
  gen: {
    match: 'any',
    getPokeValues: (poke) => (poke.gen === null ? [] : [String(poke.gen)]),
  },
};

// 세대 선택지 (새 세대가 나오면 늘린다)
const GENERATION_COUNT = 9;

// 고를 수 있는 타입(unknown 제외)만 게임 표시 순서로
const toTypeOptions = (types: readonly TypeDetail[]): PokeFilterOption[] =>
  toSelectableTypes(types).map((type) => ({
    value: type.identifier,
    label: type.nameKo,
    type,
  }));

const toFormOptions = (formGroups: readonly FormGroup[]): PokeFilterOption[] =>
  formGroups.map(({ identifier, nameKo }) => ({
    value: identifier,
    label: nameKo,
  }));

const toGenerationOptions = (): PokeFilterOption[] =>
  Array.from({ length: GENERATION_COUNT }, (_, index) => {
    const generation = String(index + 1);

    return { value: generation, label: `${generation}세대` };
  });

/**
 * 서버(page)에서 출처별 선택지를 같은 모양으로 모은다.
 * 타입은 DB 이름 + 코드 순서, 모습은 DB(form_group) 그대로, 세대는 코드
 */
const toPokeFilterOptions = (
  types: readonly TypeDetail[],
  formGroups: readonly FormGroup[],
): PokeFilterOptions => ({
  type: toTypeOptions(types),
  form: toFormOptions(formGroups),
  gen: toGenerationOptions(),
});

export type {
  PokeFilterGroup,
  PokeFilterOption,
  PokeFilterOptions,
  PokeFilterRule,
};

export {
  POKE_FILTER_GROUPS,
  POKE_FILTER_RULES,
  mapFilterGroups,
  toPokeFilterOptions,
};
