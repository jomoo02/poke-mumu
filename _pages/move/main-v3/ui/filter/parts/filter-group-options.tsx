'use client';

import { cn } from '@/_shared/lib/cn';

import { useFilterOptions, useFilterParam } from '../../../model/filter';
import type { MoveFilterGroup } from '../../../model/filter';
import type { MoveFilterCounts } from '../../../model/move-results';
import { GROUP_TITLE, OptionIcon } from './filter-option';
import {
  FilterChip,
  FilterChipList,
  FilterTile,
  FilterTileGrid,
} from './filter-toggle';

interface FilterGroupOptionsProps {
  group: MoveFilterGroup;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
  // 타일 줄 수 (드로어 4 · 팝오버·다이얼로그 5)
  tileGridClassName?: string;
  className?: string;
}

/**
 * 그룹 하나의 선택지: 아이콘이 있는 그룹(타입·분류)은 타일 [아이콘 / 이름], 없는 그룹(도감의 세대·모습 등)은 칩 [이름].
 * 고르는 즉시 반영된다. 고르면 나올 기술이 없으면 흐리게 (고를 수는 있다).
 * 전체 패널(드로어·다이얼로그)과 그룹 패널(드로어·팝오버)이 함께 쓴다
 */
export default function FilterGroupOptions({
  group,
  filterCounts,
  tileGridClassName,
  className,
}: FilterGroupOptionsProps) {
  const options = useFilterOptions();
  const { filter, toggleFilter } = useFilterParam();

  const isEmpty = (value: string) => (filterCounts[group][value] ?? 0) === 0;

  if (options[group].some((option) => option.type || option.damageClass)) {
    return (
      <FilterTileGrid
        aria-label={GROUP_TITLE[group]}
        className={cn(className, tileGridClassName)}
      >
        {options[group].map((option) => (
          <FilterTile
            key={option.value}
            pressed={filter[group].includes(option.value)}
            onPressedChange={() => toggleFilter(group, option.value)}
            label={option.label}
            icon={<OptionIcon option={option} />}
            empty={isEmpty(option.value)}
          />
        ))}
      </FilterTileGrid>
    );
  }

  return (
    <FilterChipList aria-label={GROUP_TITLE[group]} className={className}>
      {options[group].map((option) => (
        <FilterChip
          key={option.value}
          pressed={filter[group].includes(option.value)}
          onPressedChange={() => toggleFilter(group, option.value)}
          label={option.label}
          empty={isEmpty(option.value)}
        />
      ))}
    </FilterChipList>
  );
}
