'use client';

import {
  useSearchParamsState,
  type SearchParamsStateOptions,
} from './useSearchParamsState';

interface MultiSelectParamOptions extends SearchParamsStateOptions {
  // 최대 선택 개수. 도달하면 미선택 항목은 disabled 처리된다.
  max?: number;
}

/**
 * 다중 선택 URL 파라미터(type, damageClass 등). 반복 키(key=a&key=b)로 관리한다.
 */
export function useMultiSelectParam(
  key: string,
  { max, ...stateOptions }: MultiSelectParamOptions = {},
) {
  const { searchParams, toggleParam, setParams } =
    useSearchParamsState(stateOptions);

  const selected = searchParams.getAll(key).filter(Boolean);
  const selectedSet = new Set(selected);

  const isSelected = (value: string) => selectedSet.has(value);

  const isFull = max != null && selected.length >= max;
  const isDisabled = (value: string) => !isSelected(value) && isFull;

  const isActive = selected.length > 0;

  const toggle = (value: string) => toggleParam(key, value);
  const reset = () => setParams({ [key]: null });

  return { selected, isSelected, isDisabled, isActive, toggle, reset };
}
