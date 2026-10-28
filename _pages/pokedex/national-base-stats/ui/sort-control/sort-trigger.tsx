import type { ComponentProps } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { getSortLabel, type PokeSort } from '../../model/sort';

import { SORT_TITLE } from './sort-panel';

interface SortTriggerProps extends ComponentProps<'button'> {
  sortState: PokeSort;
}

// 시트·팝오버의 render로 쓰여 열기 props(onClick, aria-expanded …)를 받아 Button에 넘긴다
export default function SortTrigger({
  sortState,
  className,
  ...props
}: SortTriggerProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        '-mr-2 px-2 font-normal cursor-pointer',
        'hover:bg-transparent aria-expanded:bg-transparent dark:hover:bg-transparent',
        '[@media(hover:hover)]:hover:opacity-70 active:opacity-70',
        className,
      )}
      {...props}
    >
      <span className="sr-only">{SORT_TITLE}: </span>
      {getSortLabel(sortState)}
      <ChevronDownIcon aria-hidden className="size-4 text-foreground/70" />
    </Button>
  );
}
