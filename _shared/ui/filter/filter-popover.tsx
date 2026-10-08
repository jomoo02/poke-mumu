'use client';

import { cn } from '@/_shared/lib/cn';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';
import { ControlResetButton, ControlTriggerButton } from '@/_shared/ui/control';

import {
  getFilterTriggerLabel,
  getFilterTriggerSummary,
  type FilterGroup,
} from './filter-group';
import { FilterTiles } from './filter-tiles';

interface FilterPopoverProps {
  group: FilterGroup;
  className?: string;
}

// md 이상: 필터마다 [모든 타입 ▾] / [불꽃 +2 ▾] → 타일 팝오버. 헤더의 초기화는 이 그룹만
export function FilterPopover({ group, className }: FilterPopoverProps) {
  const isActive = group.selected.length > 0;

  const { first, rest } = getFilterTriggerSummary(group);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <ControlTriggerButton
            data-filter-trigger
            variant={isActive ? 'selected' : 'default'}
            aria-label={getFilterTriggerLabel(group)}
            className={cn('h-10 max-w-60', className)}
          >
            {/* '모든 타입' / '불꽃' / '불꽃 +2' (처음 고른 값 + 나머지 수) */}
            <span aria-hidden className="flex min-w-0 items-center gap-1.5">
              {first === null ? (
                <span className="truncate">모든 {group.title}</span>
              ) : (
                <>
                  <span className="truncate font-medium">{first}</span>
                  {rest > 0 && (
                    <span className="shrink-0 tabular-nums font-medium">
                      +{rest}
                    </span>
                  )}
                </>
              )}
            </span>
          </ControlTriggerButton>
        }
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
