import type { ComponentProps } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { getSortLabel, type AbilitySort } from '../../model/sort';

interface SortTriggerProps extends ComponentProps<'button'> {
  sortState: AbilitySort;
}

export default function SortTrigger({
  sortState,
  className,
  ...props
}: SortTriggerProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        '-mr-1 px-1 cursor-pointer h-10 rounded-lg',
        'hover:bg-transparent aria-expanded:bg-transparent dark:hover:bg-transparent',
        '[@media(hover:hover)]:hover:opacity-70 active:opacity-70 aria-expanded:opacity-70',
        className,
      )}
      {...props}
    >
      <span className="sr-only">정렬: </span>
      {getSortLabel(sortState)}
      <ChevronDownIcon aria-hidden className="size-4 text-foreground/70" />
    </Button>
  );
}
