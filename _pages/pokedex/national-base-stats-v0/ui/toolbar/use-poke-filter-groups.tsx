'use client';

import { useMemo } from 'react';

import type { FilterGroup, FilterOption } from '@/_shared/ui/filter';
import { TypeIconLabel, type Type } from '@/_entities/type';

import { usePokeFilter } from '../../model/poke-filter';
import {
  FILTER_GROUP,
  MAX_TYPE_SELECTION,
} from '../../config/national-base-stats';

/**
 * 타입 필터 그룹. 선택지는 entity IconLabel(아이콘 위·이름 아래)로 그린다.
 * 선택값은 목록 계산과 같은 기준(유효한 identifier만)으로 넘겨 트리거·배지가 결과와 어긋나지 않게 한다.
 * 포켓몬 타입은 최대 2개라 2개를 고르면 나머지 타입은 막는다 (고른 타입은 눌러서 해제할 수 있다)
 */
export function usePokeFilterGroups(types: Type[]): FilterGroup[] {
  const { filter, toggle, resetGroup } = usePokeFilter();

  const typeOptions = useMemo<FilterOption[]>(
    () =>
      types.map((type) => ({
        value: type.identifier,
        label: type.nameKo,
        tile: <TypeIconLabel type={type} className="w-full" />,
      })),
    [types],
  );

  const isTypeFull = filter.types.length >= MAX_TYPE_SELECTION;

  const groups: FilterGroup[] = [
    {
      key: FILTER_GROUP.type,
      title: '타입',
      options: typeOptions,
      selected: filter.types,
      onToggle: (value) => toggle(FILTER_GROUP.type, value),
      onReset: () => resetGroup(FILTER_GROUP.type),
      isDisabled: (value) => isTypeFull && !filter.types.includes(value),
      columns: 6,
    },
  ];

  return groups;
}
