'use client';

import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { getSortLabel, useMoveSort } from '../../model/move-sort';

// 아이콘은 현재 방향(asc: 작은 값부터, desc: 큰 값부터)
const ORDER_ICON = {
  asc: ArrowUpNarrowWideIcon,
  desc: ArrowDownWideNarrowIcon,
} as const;

// 기준은 그대로 두고 방향만 한 번에 뒤집는다
export default function SortOrderToggle() {
  const { sortState, toggleOrder } = useMoveSort();

  const Icon = ORDER_ICON[sortState.order];

  // 누르면 바뀔 정렬을 이름으로 알린다 (예: '위력 낮은 순으로 바꾸기')
  const nextLabel = `${getSortLabel({
    sort: sortState.sort,
    order: sortState.order === 'asc' ? 'desc' : 'asc',
  })}으로 바꾸기`;

  return (
    <Button
      variant="secondary"
      aria-label={nextLabel}
      title={nextLabel}
      onClick={toggleOrder}
      className={cn(
        'size-10.5 shrink-0 bg-input/50 dark:bg-input/70',
        '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
      )}
    >
      <Icon aria-hidden="true" className="size-4.25" />
    </Button>
  );
}
