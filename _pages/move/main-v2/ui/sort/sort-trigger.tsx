import type { ComponentProps } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { getSortLabel, type MoveSort } from '../../model/sort';

interface SortTriggerProps extends ComponentProps<'button'> {
  sortState: MoveSort;
}

// [이름순 ⌄]: 배경 없는 글자 버튼 (도감 종족값 페이지와 같은 모양). 칩 줄 오른쪽 끝.
// -mr-1: 글자 끝을 줄 끝에 맞춘다. 호버·열림은 흐리게. '정렬:'은 스크린리더만 읽는다
export default function SortTrigger({
  sortState,
  className,
  ...props
}: SortTriggerProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        '-mr-1 h-9 cursor-pointer rounded-lg px-1',
        // 'cursor-pointer',
        'hover:bg-transparent aria-expanded:bg-transparent dark:hover:bg-transparent',
        '[@media(hover:hover)]:hover:opacity-70 active:opacity-70 aria-expanded:opacity-70',
        className,
      )}
      {...props}
    >
      <span className="sr-only">정렬: </span>
      {getSortLabel(sortState)}
      <ChevronDownIcon
        aria-hidden
        data-icon="inline-end"
        className="size-4 text-foreground/70"
      />
    </Button>
  );
}
