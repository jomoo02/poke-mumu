import type { ComponentProps } from 'react';
import { ArrowUpDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';

import { getSortLabel, type MoveSort } from '../../model/sort';
import { ChipTrigger } from '../toolbar-kit';

interface SortTriggerProps extends ComponentProps<'button'> {
  sortState: MoveSort;
}

// [↕ 이름순 ⌄]: 필터 트리거와 같은 칩 모양 (툴바 필터 줄 맨 왼쪽). '정렬:'은 스크린리더만 읽는다
export default function SortTrigger({
  sortState,
  className,
  ...props
}: SortTriggerProps) {
  return (
    <ChipTrigger
      className={cn('shrink-0 cursor-pointer', className)}
      {...props}
    >
      <ArrowUpDownIcon
        aria-hidden
        data-icon="inline-start"
        className="size-4 text-foreground/70"
      />
      <span className="sr-only">정렬: </span>
      {getSortLabel(sortState)}
    </ChipTrigger>
  );
}
