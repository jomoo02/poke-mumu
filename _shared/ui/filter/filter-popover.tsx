'use client';

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';
import { ControlResetButton } from '@/_shared/ui/control';

import type { FilterGroup } from './filter-group';
import { FilterTiles } from './filter-tiles';
import { FilterTrigger } from './filter-trigger';

interface FilterPopoverProps {
  group: FilterGroup;
  className?: string;
}

// md 이상: 필터마다 [모든 타입 ▾] / [불꽃 +2 ▾] → 타일 팝오버. 헤더의 초기화는 이 그룹만
export function FilterPopover({ group, className }: FilterPopoverProps) {
  const isActive = group.selected.length > 0;

  return (
    <Popover>
      <PopoverTrigger
        render={<FilterTrigger group={group} className={className} />}
      />
      {/* 폭은 타일 격자(열 수 × 고정 타일 폭)에 맞춘다 → 그룹이 몇 열이든 타일 크기가 같다 */}
      <PopoverContent className="w-fit">
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle>{group.title}</PopoverTitle>
          <ControlResetButton onClick={group.onReset} disabled={!isActive} />
        </PopoverHeader>
        <FilterTiles group={group} place="popover" />
      </PopoverContent>
    </Popover>
  );
}
