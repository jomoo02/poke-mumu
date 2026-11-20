import type { ComponentProps } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

interface ChipTriggerProps extends ComponentProps<'button'> {
  // 고른 게 있으면 선택 색(--selected)으로 채운다
  active?: boolean;
}

/**
 * 툴바 칩 트리거 (필터·정렬 공용): [글자 ⌄]. 높이 40 (툴바 컨트롤).
 * 기본은 옅은 회색 채움(검색창과 같은 면), active면 선택 색 채움 + 반전 글자.
 * 화살표는 16px, 기본일 때만 흐리게 (글자가 먼저 읽히게). 열리면 뒤집힌다 (group-data-popup-open)
 * (기술 페이지 전용으로 다듬는 중. 확정되면 _shared로 옮기고 _shared/ui/control을 지운다)
 */
export function ChipTrigger({
  active = false,
  className,
  children,
  ...props
}: ChipTriggerProps) {
  return (
    <Button
      className={cn(
        'group h-10 gap-2 transition-none',
        active
          ? 'bg-selected border-selected text-selected-foreground hover:bg-selected/90 aria-expanded:bg-selected/90'
          : 'bg-input/50 dark:bg-input/70 text-foreground hover:bg-input/80 dark:hover:bg-input aria-expanded:bg-input/80 dark:aria-expanded:bg-input',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-icon="inline-end"
        className={cn(
          'size-4 transition-transform duration-150 group-data-popup-open:rotate-180',
          !active && 'text-foreground/70',
        )}
      />
    </Button>
  );
}
