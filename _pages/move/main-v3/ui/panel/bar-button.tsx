import type { ComponentProps } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

interface BarButtonProps extends ComponentProps<typeof Button> {
  // 고른 값이 있으면 채운다 (그룹 버튼)
  active?: boolean;
}

/**
 * 툴바 버튼 줄의 둥근 버튼 [이름 ⌄] (높이 36, 얇은 테두리). 그룹·정렬 버튼이 함께 쓴다.
 * props는 Drawer·PopoverTrigger가 render로 넘기는 것(onClick·ref·aria-*)까지 받는다
 */
export default function BarButton({
  active = false,
  className,
  children,
  ...props
}: BarButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'shrink-0 cursor-pointer rounded-full dark:bg-card',
        active &&
          'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground aria-expanded:bg-primary/90 aria-expanded:text-primary-foreground dark:bg-primary dark:hover:bg-primary/90',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden
        data-icon="inline-end"
        className={cn('size-4', active ? 'opacity-80' : 'text-foreground/70')}
      />
    </Button>
  );
}
