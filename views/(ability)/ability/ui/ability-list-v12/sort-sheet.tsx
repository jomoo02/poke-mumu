'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import {
  SORT_OPTIONS,
  getSortLabel,
  isSameSort,
  type AbilitySort,
} from './lib';

interface SortSheetProps {
  sort: AbilitySort;
  onSortChange: (sort: AbilitySort) => void;
}

/** 좁은 폭 정렬 선택. 항목을 고르면 바로 적용하고 닫는다. */
export default function SortSheet({ sort, onSortChange }: SortSheetProps) {
  const [open, setOpen] = useState(false);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const label = getSortLabel(sort);

  const select = (option: AbilitySort) => {
    onSortChange(option);
    setOpen(false);
  };

  // radiogroup 로빙 포커스. 화살표는 포커스만 옮기고, 적용(=닫기)은 Enter/Space/클릭으로 한다.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const count = SORT_OPTIONS.length;
    const current = optionRefs.current.findIndex(
      (element) => element === document.activeElement,
    );
    if (current === -1) return;

    let next: number;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = (current + 1) % count;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        next = (current - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    optionRefs.current[next]?.focus();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label={`정렬: ${label}`}
            className={cn(
              'inline-flex h-10 min-w-0 flex-1 items-center justify-between gap-2 rounded-full border px-4 text-sm font-medium outline-none',
              'focus-visible:ring-[3px] focus-visible:ring-ring/50',
              '[@media(hover:hover)]:hover:bg-muted',
            )}
          >
            <span className="truncate">{label}</span>
            <ChevronsUpDownIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground"
            />
          </button>
        }
      />
      <SheetContent
        side="bottom"
        className="gap-0 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <SheetHeader className="pb-3">
          <SheetTitle>정렬</SheetTitle>
        </SheetHeader>
        <div
          role="radiogroup"
          aria-label="정렬 기준"
          onKeyDown={handleKeyDown}
          className="flex flex-col gap-0.5 px-3"
        >
          {SORT_OPTIONS.map((option, index) => {
            const checked = isSameSort(option, sort);

            return (
              <button
                key={`${option.key}-${option.order}`}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => select(option)}
                className={cn(
                  'flex h-13 items-center justify-between gap-3 rounded-xl px-3 text-left text-base outline-none',
                  'focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  '[@media(hover:hover)]:hover:bg-muted',
                  checked && 'font-semibold',
                )}
              >
                {getSortLabel(option)}
                <CheckIcon
                  aria-hidden="true"
                  className={cn('size-5 shrink-0', !checked && 'invisible')}
                />
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
