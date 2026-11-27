'use client';

import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import { Popover, PopoverContent, PopoverTrigger } from '@/_shared/ui/popover';

import {
  MOVE_FILTER_GROUP_TITLE,
  useFilterParam,
  type MoveFilterGroup,
} from '../../model/filter';
import FilterOptionList from './filter-option-list';
import { MD_QUERY } from '../../lib/breakpoint';
import type { MoveFilterCounts } from '../../model/move-results';
import { Button } from '@/_shared/ui/button';
import { ChevronDownIcon } from 'lucide-react';

interface FilterPopoverProps {
  group: MoveFilterGroup;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
}

// [타입 ⌄] · 고르면 [타입 2 ⌄] 채움. 접근 이름 '타입 필터, 2개 선택됨'
function getGroupButtonLabel(group: MoveFilterGroup, count: number) {
  return {
    label:
      count > 0
        ? `${MOVE_FILTER_GROUP_TITLE[group]} ${count}`
        : MOVE_FILTER_GROUP_TITLE[group],
    ariaLabel:
      count > 0
        ? `${MOVE_FILTER_GROUP_TITLE[group]} 필터, ${count}개 선택됨`
        : `${MOVE_FILTER_GROUP_TITLE[group]} 필터`,
  };
}

/**
 * 팝오버 폭: 타일 하나 84px 기준 (타일 × n + 간격 6 × (n-1) + 안쪽 여백 10 × 2)
 *   타입 5열 = 420 + 24 + 20 = 464px (w-116)
 *   분류 3열 = 252 + 12 + 20 = 284px (w-71)
 */
const POPOVER_LAYOUT: Record<MoveFilterGroup, { width: string; grid: string }> =
  {
    type: { width: cn('w-116'), grid: cn('grid-cols-5') },
    damageClass: { width: cn('w-71'), grid: cn('grid-cols-3') },
  };

// md 이상: 버튼 아래 팝오버 (그 그룹 선택지만, 제목·초기화 없음. 바깥을 누르거나 Esc로 닫는다).
// modal: 열린 동안 페이지 스크롤·바깥 조작을 막는다 (정렬 팝오버와 같다)
export default function FilterPopover({
  group,
  filterCounts,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const { filter } = useFilterParam();
  const count = filter[group].length;
  const { label, ariaLabel } = getGroupButtonLabel(group, count);

  useCloseOutsideMedia(MD_QUERY, open, () => setOpen(false));

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              'shrink-0 cursor-pointer dark:bg-card max-md:hidden group flex',
              count > 0 &&
                'border-primary bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground aria-expanded:bg-primary/80 aria-expanded:text-primary-foreground dark:bg-primary dark:hover:bg-primary/80 dark:aria-expanded:bg-primary/80',
            )}
            aria-label={ariaLabel}
          >
            {label}
            <ChevronDownIcon
              aria-hidden
              data-icon="inline-end"
              className={cn(
                'size-4.5 text-foreground/70',
                'group-aria-expanded:rotate-180',
                count > 0 && 'text-primary-foreground',
              )}
            />
          </Button>
        }
      />
      <PopoverContent
        aria-label={MOVE_FILTER_GROUP_TITLE[group]}
        className={cn(POPOVER_LAYOUT[group].width, 'p-2.5')}
      >
        <FilterOptionList
          group={group}
          filterCounts={filterCounts}
          className={POPOVER_LAYOUT[group].grid}
        />
      </PopoverContent>
    </Popover>
  );
}
