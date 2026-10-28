'use client';

import { useMemo } from 'react';

import type {
  FilterCheckboxGroup,
  FilterCheckboxOption,
} from '@/_shared/ui/filter';
import { TypeIcon } from '@/_entities/type';

import {
  POKE_FILTER_GROUPS,
  POKE_FILTER_RULES,
  type PokeFilterGroup,
  type PokeFilterOption,
  type PokeFilterOptions,
} from '../../model/filter';
import { useConditions } from '../../model/conditions';

// 그룹별 제목·목록 열 수 (글자 길이에 맞춘다: 모습은 '팔데아의 모습'처럼 길어 1열)
const GROUP_VIEW: Record<
  PokeFilterGroup,
  Pick<FilterCheckboxGroup, 'title' | 'columns'>
> = {
  type: { title: '타입', columns: 3 },
  form: { title: '모습', columns: 1 },
  gen: { title: '세대', columns: 2 },
};

// 선택지 → 체크박스 항목. 타입 선택지만 아이콘을 붙인다 (옆에 이름이 보여 아이콘은 장식)
const toCheckboxOptions = (
  options: readonly PokeFilterOption[],
): FilterCheckboxOption[] =>
  options.map(({ value, label, type }) => ({
    value,
    label,
    icon: type && <TypeIcon type={type} decorative />,
  }));

/**
 * 필터 그룹 (타입 · 모습 · 세대). 선택지는 서버에서 받은 options 그대로, 타입만 아이콘을 붙인다.
 * 선택값은 목록 계산과 같은 기준(유효한 값만)으로 넘겨 트리거가 결과와 어긋나지 않게 한다.
 * 최대 선택 수에 닿으면 고르지 않은 나머지는 막는다 (고른 값은 눌러서 해제할 수 있다)
 */
export function usePokeFilterGroups(
  options: PokeFilterOptions,
): FilterCheckboxGroup[] {
  const { filter, toggleFilter, resetFilterGroup } = useConditions(options);

  const checkboxOptions = useMemo(
    (): Record<PokeFilterGroup, FilterCheckboxOption[]> => ({
      type: toCheckboxOptions(options.type),
      form: toCheckboxOptions(options.form),
      gen: toCheckboxOptions(options.gen),
    }),
    [options],
  );

  return POKE_FILTER_GROUPS.map((group) => {
    const selected = filter[group];
    const { max } = POKE_FILTER_RULES[group];
    const isFull = max !== undefined && selected.length >= max;

    return {
      key: group,
      ...GROUP_VIEW[group],
      max,
      options: checkboxOptions[group],
      selected,
      onToggle: (value) => toggleFilter(group, value),
      onReset: () => resetFilterGroup(group),
      isDisabled: isFull ? (value) => !selected.includes(value) : undefined,
    };
  });
}
