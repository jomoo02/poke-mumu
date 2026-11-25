import type { ComponentProps } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

interface FilterTriggerButtonProps extends ComponentProps<typeof Button> {
  selectedCount: number;
}

/**
 * 필터 트리거: [⚙] (md 미만, 44×44) · [⚙ 필터] (md 이상). 크기는 size="lg"가 정하고 md 미만만 덮는다.
 * 고른 개수는 접근 이름으로만 ('필터, 2개 선택됨'). props는 Drawer·SheetTrigger가 render로 넘기는 것(onClick·ref·aria-*)까지 받는다
 */
export default function FilterTriggerButton({
  selectedCount,
  className,
  ...props
}: FilterTriggerButtonProps) {
  return (
    <Button
      data-filter-trigger
      size="lg"
      aria-label={
        selectedCount > 0 ? `필터, ${selectedCount}개 선택됨` : '필터'
      }
      className={cn(
        'pl-4 max-md:w-11 max-md:px-0',
        'shrink-0 cursor-pointer bg-input/50 text-foreground transition-none hover:bg-input/80 aria-expanded:bg-input/80 dark:bg-input/70 dark:hover:bg-input dark:aria-expanded:bg-input',
        className,
      )}
      {...props}
    >
      <SlidersHorizontalIcon
        aria-hidden
        className="size-4.25 text-foreground/70"
      />
      <span aria-hidden className="hidden md:inline">
        필터
      </span>
    </Button>
  );
}
