/** 범위 필터(URL `scope`) 값. 'all'은 기본값이라 URL에 쓰이지 않는다. */
export const ABILITY_SCOPES = ['all', 'champions'] as const;

export type AbilityScope = (typeof ABILITY_SCOPES)[number];

/** 정렬(URL `sort`) 값. 'ko'는 기본값이라 URL에 쓰이지 않는다. */
export const ABILITY_SORTS = ['ko', 'en'] as const;

export type AbilitySort = (typeof ABILITY_SORTS)[number];

export const SCOPE_LABELS: Record<AbilityScope, string> = {
  all: '전체',
  champions: '챔피언스',
};

export const SORT_LABELS: Record<AbilitySort, string> = {
  ko: '가나다순',
  en: 'ABC순',
};

function includesValue<T extends string>(
  values: readonly T[],
  value: unknown,
): value is T {
  return typeof value === 'string' && (values as readonly string[]).includes(value);
}

/** base-ui Tabs의 onValueChange 값은 타입이 느슨해 좁혀서 쓴다. */
export function isAbilityScope(value: unknown): value is AbilityScope {
  return includesValue(ABILITY_SCOPES, value);
}

export function isAbilitySort(value: unknown): value is AbilitySort {
  return includesValue(ABILITY_SORTS, value);
}
