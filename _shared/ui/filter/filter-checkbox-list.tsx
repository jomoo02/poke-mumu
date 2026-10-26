'use client';

import { useId } from 'react';

import { cn } from '@/_shared/lib/cn';
import { Checkbox } from '@/_shared/ui/checkbox';
import { ControlRadioGroupLabel } from '@/_shared/ui/control';

import type { FilterCheckboxGroup } from './filter-group';

type FilterCheckboxPlace = 'sheet' | 'popover';

// 줄 높이. 시트는 터치 목표 44px, 팝오버는 마우스·태블릿이라 조금 촘촘하게 (정렬·이름 언어 목록과 같다)
const ROW_CLASS: Record<FilterCheckboxPlace, string> = {
  sheet: 'h-11',
  popover: 'h-10.5',
};

// 시트: 좁은 화면이라 2열까지 (/pokedex/national과 같다)
const SHEET_GRID: Record<FilterCheckboxGroup['columns'], string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-2',
};

// 팝오버: 열 수만 정한다. 폭은 팝오버가 정한다 (filter-checkbox-popover.tsx).
// 3열은 lg 미만에서 2열 (/pokedex/national과 같다)
const POPOVER_GRID: Record<FilterCheckboxGroup['columns'], string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-2 lg:grid-cols-3',
};

interface FilterCheckboxListProps {
  group: FilterCheckboxGroup;
  place: FilterCheckboxPlace;
  className?: string;
}

/**
 * 선택지 체크박스 목록. 누르는 즉시 onToggle (여러 개를 고르므로 닫지 않는다).
 * 줄 전체가 라벨이라 어디를 눌러도 체크된다. 최대 선택 수에 닿으면 나머지는 비활성
 */
export function FilterCheckboxList({
  group,
  place,
  className,
}: FilterCheckboxListProps) {
  const idPrefix = useId();

  const selected = new Set(group.selected);

  return (
    <div
      role="group"
      aria-label={group.title}
      className={cn(
        'grid gap-x-6 gap-y-1',
        place === 'sheet'
          ? SHEET_GRID[group.columns]
          : POPOVER_GRID[group.columns],
        className,
      )}
    >
      {group.options.map((option) => {
        const id = `${idPrefix}-${option.value}`;

        return (
          <ControlRadioGroupLabel
            key={option.value}
            htmlFor={id}
            className={cn(
              'min-w-0',
              // 비활성 체크박스(data-disabled)가 있으면 줄 전체를 흐리게, 호버 배경도 없앤다
              'has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-disabled:hover:after:bg-transparent',
              ROW_CLASS[place],
            )}
          >
            <Checkbox
              id={id}
              checked={selected.has(option.value)}
              disabled={group.isDisabled?.(option.value)}
              onCheckedChange={() => group.onToggle(option.value)}
            />
            {option.icon}
            <span className="truncate">{option.label}</span>
          </ControlRadioGroupLabel>
        );
      })}
    </div>
  );
}
