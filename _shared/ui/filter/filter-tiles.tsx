'use client';

import { CheckIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';

import type { FilterGroup } from './filter-group';

type FilterTilesPlace = 'sheet' | 'popover';

// 팝오버: 그룹의 열 수(3·6)대로, 타일 폭 고정(아래 POPOVER_GRID).
// 시트: 모든 그룹이 같은 격자를 써서 탭을 바꿔도 타일 크기·시작 위치가 같다
// (분류처럼 3개뿐인 그룹은 왼쪽부터 채운다). 좁은 화면 4열, sm 이상 6열(타입 18개가 3줄로 맞는다)
const SHEET_GRID = 'grid-cols-4 sm:grid-cols-6';

// 팝오버는 타일 폭을 고정(5.5rem)하고 팝오버가 그 격자에 맞춰진다 → 3열·6열 그룹의 타일 크기가 같다
const POPOVER_GRID: Record<FilterGroup['columns'], string> = {
  3: 'grid-cols-[repeat(3,5.5rem)]',
  6: 'grid-cols-[repeat(6,5.5rem)]',
};

interface FilterTilesProps {
  group: FilterGroup;
  place: FilterTilesPlace;
  className?: string;
}

// 선택지 타일 그리드. 누르는 즉시 onToggle.
// 틀(배경·테두리) 없이 두고, 선택되거나 호버하면 bg-accent를 깐다.
// 배경만으로 알리지 않게 아이콘 오른쪽 위 체크 배지를 함께 둔다
export function FilterTiles({ group, place, className }: FilterTilesProps) {
  const selectedSet = new Set(group.selected);

  return (
    <div
      role="group"
      aria-label={group.title}
      className={cn(
        'grid gap-2',
        place === 'sheet' ? SHEET_GRID : POPOVER_GRID[group.columns],
        className,
      )}
    >
      {group.options.map((option) => {
        const isSelected = selectedSet.has(option.value);

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            disabled={group.isDisabled?.(option.value)}
            onClick={() => group.onToggle(option.value)}
            className={cn(
              'relative flex h-20 min-w-0 cursor-pointer items-center justify-center rounded-lg px-1 outline-none',
              'focus-visible:ring-3 focus-visible:ring-ring/50',
              'disabled:cursor-not-allowed disabled:opacity-50',
              // 선택된 타일은 bg-accent 고정, 나머지는 호버 때만 bg-accent (시트·팝오버 공통)
              isSelected
                ? 'bg-accent text-accent-foreground'
                : '[@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground',
            )}
          >
            {option.tile}
            {/* 체크 배지: 아이콘(size-7, 타일 세로 가운데의 위쪽) 오른쪽 위 모서리에 겹친다.
                ring으로 아이콘과 배지 사이를 팝오버·시트 배경색만큼 띄운다 */}
            {isSelected && (
              <span
                aria-hidden
                className="absolute top-1 left-[calc(50%+0.375rem)] flex size-4 items-center justify-center rounded-full bg-selected text-selected-foreground ring-2 ring-popover"
              >
                <CheckIcon className="size-2.5" strokeWidth={4} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
