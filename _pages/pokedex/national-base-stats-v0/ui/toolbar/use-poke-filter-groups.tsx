'use client';

import { useMemo } from 'react';

import type { FilterGroup, FilterOption } from '@/_shared/ui/filter';
import { TypeIconLabel } from '@/_entities/type';
import {
  POKE_FILTER_RULES,
  usePokeFilter,
  type PokeFilterOptions,
} from '@/_pages/pokedex/national-base-stats/model/poke-filter';

/**
 * 타입 필터 그룹. 선택지는 entity IconLabel(아이콘 위·이름 아래)로 그린다.
 * 선택값은 목록 계산과 같은 기준(유효한 identifier만)으로 넘겨 트리거·배지가 결과와 어긋나지 않게 한다.
 * 포켓몬 타입은 최대 2개라 2개를 고르면 나머지 타입은 막는다 (고른 타입은 눌러서 해제할 수 있다)
 * (4-5에서 정식 slice의 체크박스 필터로 바뀐다)
 */
export function usePokeFilterGroups(options: PokeFilterOptions): FilterGroup[] {
  const { filter, toggle, resetGroup } = usePokeFilter(options);

  const typeOptions = useMemo<FilterOption[]>(
    () =>
      options.type.map(({ value, label, type }) => ({
        value,
        label,
        tile: type ? <TypeIconLabel type={type} className="w-full" /> : label,
      })),
    [options.type],
  );

  const selectedTypes = filter.type;

  const isTypeFull =
    selectedTypes.length >= (POKE_FILTER_RULES.type.max ?? Infinity);

  const groups: FilterGroup[] = [
    {
      key: 'type',
      title: '타입',
      options: typeOptions,
      selected: selectedTypes,
      onToggle: (value) => toggle('type', value),
      onReset: () => resetGroup('type'),
      isDisabled: (value) => isTypeFull && !selectedTypes.includes(value),
      columns: 6,
    },
  ];

  return groups;
}
