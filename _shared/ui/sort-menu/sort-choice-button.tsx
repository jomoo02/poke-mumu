'use client';

import type { ComponentProps } from 'react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

interface SortChoiceButtonProps extends ComponentProps<'button'> {
  // 지금 정렬에 해당하는 칸
  active: boolean;
}

/**
 * 정렬 시트의 선택 칸 (분리형·표형 공용). 누르면 반영하고 시트를 닫는 동작이라 radio가 아닌 버튼이다
 * (radio는 화살표 키로 옮기기만 해도 선택된다). 지금 정렬은 aria-current + 선택 색(--selected)으로 알린다
 */
export function SortChoiceButton({
  active,
  className,
  ...props
}: SortChoiceButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      aria-current={active ? 'true' : undefined}
      className={cn(
        'h-10 min-w-0 cursor-pointer gap-1.5 rounded-lg px-3 text-sm font-medium transition-none',
        active
          ? 'bg-selected text-selected-foreground [@media(hover:hover)]:hover:bg-selected/85'
          : cn(
              'bg-input/50 text-foreground dark:bg-input/70',
              '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
            ),
        className,
      )}
      {...props}
    />
  );
}
