'use client';

import { useMemo } from 'react';

import type { FilterGroup, FilterOption } from '@/_shared/ui/filter';
import { TypeIconLabel, type Type } from '@/_entities/type';
import {
  DamageClassIconLabel,
  type DamageClass,
} from '@/_entities/damage-class';

import { useMoveFilter } from '../../model/move-filter';
import { FILTER_GROUP } from '../../config/move-list';

/**
 * 타입·분류 필터 그룹. 선택지는 테이블과 같은 entity IconLabel(아이콘 위·이름 아래)로 그린다.
 * 선택값은 목록 계산과 같은 기준(유효한 identifier만)으로 넘겨 트리거·배지가 결과와 어긋나지 않게 한다.
 * selected는 고른 순서다(트리거가 처음 고른 값을 보여준다).
 */
export function useMoveFilterGroups(
  types: Type[],
  damageClasses: DamageClass[],
): FilterGroup[] {
  const { filter, toggle, resetGroup } = useMoveFilter();

  const typeOptions = useMemo<FilterOption[]>(
    () =>
      types.map((type) => ({
        value: type.identifier,
        label: type.nameKo,
        tile: <TypeIconLabel type={type} className="w-full" />,
      })),
    [types],
  );

  const damageClassOptions = useMemo<FilterOption[]>(
    () =>
      damageClasses.map((damageClass) => ({
        value: damageClass.identifier,
        label: damageClass.nameKo,
        tile: (
          <DamageClassIconLabel damageClass={damageClass} className="w-full" />
        ),
      })),
    [damageClasses],
  );

  const groups: FilterGroup[] = [
    {
      key: FILTER_GROUP.type,
      title: '타입',
      options: typeOptions,
      selected: filter.types,
      onToggle: (value) => toggle(FILTER_GROUP.type, value),
      onReset: () => resetGroup(FILTER_GROUP.type),
      columns: 6,
    },
    {
      key: FILTER_GROUP.damageClass,
      title: '분류',
      options: damageClassOptions,
      selected: filter.damageClasses,
      onToggle: (value) => toggle(FILTER_GROUP.damageClass, value),
      onReset: () => resetGroup(FILTER_GROUP.damageClass),
      columns: 3,
    },
  ];

  return groups;
}
