'use client';

import {
  useSearchParamsState,
  type SearchParamsStateOptions,
} from './useSearchParamsState';

interface SingleParamOptions<
  T extends string,
> extends SearchParamsStateOptions {
  defaultValue: T;
  // 허용 값 목록. 지정 시 URL의 잘못된 값은 defaultValue로 폴백한다.
  validValues?: readonly T[];
}

/**
 * 단일 값 URL 파라미터(정렬 key, 방향 등). 기본값은 URL에 쓰지 않는다.
 */
export function useSingleParam<T extends string = string>(
  key: string,
  { defaultValue, validValues, ...stateOptions }: SingleParamOptions<T>,
) {
  const { searchParams, setParams } = useSearchParamsState(stateOptions);

  const raw = searchParams.get(key);
  const isValid =
    raw != null && (validValues ? validValues.includes(raw as T) : true);
  const value: T = isValid ? (raw as T) : defaultValue;

  const isActive = value !== defaultValue;

  const setValue = (next: T) =>
    setParams({ [key]: next === defaultValue ? null : next });

  const reset = () => setParams({ [key]: null });

  return { value, isActive, setValue, reset };
}
