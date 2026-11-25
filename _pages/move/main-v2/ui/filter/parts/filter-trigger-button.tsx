import type { ComponentProps } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

interface FilterTriggerButtonProps extends ComponentProps<typeof Button> {
  selectedCount: number;
}

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
