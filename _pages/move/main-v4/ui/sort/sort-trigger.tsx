import type { ComponentProps } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

interface SortTriggerProps extends Omit<
  ComponentProps<typeof Button>,
  'children'
> {
  // 지금 정렬 ('이름순'). 접근 이름은 '정렬: 이름순'
  label: string;
}

/**
 * 정렬 트리거 [이름순 ⌄]: 테두리 없는 글자 버튼, 열리면 ⌄가 뒤집힌다.
 * Drawer·PopoverTrigger가 render로 넘기는 props(onClick·ref·aria-*)까지 받는다
 */
export default function SortTrigger({
  label,
  className,
  ...props
}: SortTriggerProps) {
  return (
    <Button
      size="xs"
      variant="ghost"
      aria-label={`정렬: ${label}`}
      className={cn(
        'group cursor-pointer rounded-md px-0',
        'hover:bg-transparent aria-expanded:bg-transparent dark:hover:bg-transparent dark:aria-expanded:bg-transparent',
        className,
      )}
      {...props}
    >
      <span aria-hidden>{label}</span>
      <ChevronDownIcon
        aria-hidden
        className={cn(
          'size-4.5 text-foreground/70 group-aria-expanded:rotate-180',
        )}
      />
    </Button>
  );
}
