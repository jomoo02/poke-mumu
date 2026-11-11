import { CheckIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import { Button } from '@/_shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import {
  SORT_OPTIONS,
  getOrderLabel,
  getSortOptionAriaLabel,
} from '../../model/sort';
import SortStateIcon from '../sort-state-icon';
import { SORT_TITLE, type SortProps } from './sort-props';
import SortTrigger from './sort-trigger';

export default function SortSheet({ sortState, onToggle }: SortProps) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia('(max-width: 767px)', open, () => setOpen(false));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<SortTrigger sortState={sortState} className="md:hidden" />}
      />
      <SheetContent side="bottom" className="max-h-[70dvh] gap-0">
        <SheetHeader>
          <SheetTitle>{SORT_TITLE}</SheetTitle>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6 pb-6">
          <ul className="flex flex-col -mx-3">
            {SORT_OPTIONS.map(({ key, label }) => {
              const isCurrent = sortState.sort === key;
              const ariaLabel = getSortOptionAriaLabel(sortState, key);

              return (
                <li key={key}>
                  <Button
                    variant="ghost"
                    aria-label={isCurrent ? `선택됨, ${ariaLabel}` : ariaLabel}
                    onClick={() => onToggle(key)}
                    className={cn(
                      'relative flex w-full items-center pl-10.5 pr-3 gap-2.5 border-0 cursor-pointer',
                      'hover:bg-transparent dark:hover:bg-transparent [@media(hover:hover)]:hover:bg-accent dark:[@media(hover:hover)]:hover:bg-accent',
                      'h-12 rounded-lg active:bg-accent text-md active:not-aria-[haspopup]:translate-y-0',
                    )}
                  >
                    <span
                      aria-hidden
                      className="flex size-5 shrink-0 items-center absolute justify-center left-2.75"
                    >
                      {isCurrent && <CheckIcon className="size-4.75" />}
                    </span>
                    <span
                      aria-hidden
                      className="min-w-0 flex-1 truncate text-left"
                    >
                      {label}
                    </span>
                    {isCurrent && (
                      <span
                        aria-hidden
                        className="flex shrink-0 items-center gap-2 pr-0.5"
                      >
                        {getOrderLabel(sortState)}
                        <SortStateIcon order={sortState.order} />
                      </span>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
