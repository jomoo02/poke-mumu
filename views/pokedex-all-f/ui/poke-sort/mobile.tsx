'use client';

import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import usePokeSortView from './usePokeSortView';

export default function PokeSortMobile() {
  const [open, setOpen] = useState(false);
  const {
    key,
    dir,
    options,
    currentLabel,
    isActive,
    changeSortKey,
    changeSortDir,
    resetSort,
  } = usePokeSortView();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={isActive ? 'default' : 'secondary'}
          className={cn(
            'h-10.5 transition-none',
            isActive
              ? 'bg-primary hover:bg-primary/70 text-primary-foreground active:bg-primary/70'
              : 'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
          )}
        >
          <span>정렬: {currentLabel}</span>
          <ChevronDownIcon className="size-4.5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="gap-0" showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>정렬</SheetTitle>
          <SheetDescription className="sr-only">정렬 옵션</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-6 max-h-[60dvh] overflow-auto no-scrollbar flex-1">
          <div>
            <div className="text-sm font-medium pb-3 text-foreground/70">
              정렬 방향
            </div>
            <div className="grid grid-cols-2">
              <Button
                onClick={() => changeSortDir('asc')}
                aria-pressed={dir === 'asc'}
                variant={'outline'}
                className={cn(
                  'rounded-lg h-10 border-r rounded-r-none gap-2 cursor-pointer',
                  dir === 'asc'
                    ? 'bg-muted dark:bg-input hover:bg-muted dark:hover:bg-input'
                    : 'bg-transparent hover:bg-muted/70',
                )}
              >
                오름차순
                <ArrowUpIcon className="size-4" />
              </Button>
              <Button
                onClick={() => changeSortDir('desc')}
                aria-pressed={dir === 'desc'}
                variant={'outline'}
                className={cn(
                  'rounded-lg h-10 border-l-0 rounded-l-none gap-2 cursor-pointer',
                  dir === 'desc'
                    ? 'bg-muted dark:bg-input hover:bg-muted dark:hover:bg-input'
                    : 'bg-transparent hover:bg-muted/70',
                )}
              >
                내림차순
                <ArrowDownIcon className="size-4" />
              </Button>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium pb-3 text-foreground/70">
              정렬 기준
            </div>
            <RadioGroup
              value={key}
              onValueChange={changeSortKey}
              className="gap-1.5"
            >
              {options.map((option) => (
                <Label
                  key={`sort-${option.key}`}
                  htmlFor={`sort-${option.key}`}
                  className={cn(
                    'relative isolate flex items-center gap-2.5 h-11 text-md cursor-pointer',
                    'after:absolute after:inset-y-0 after:-inset-x-2 after:-z-10 after:rounded-lg hover:after:bg-muted',
                  )}
                >
                  <RadioGroupItem
                    id={`sort-${option.key}`}
                    value={option.key}
                  />
                  {option.label}
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>

        <SheetFooter>
          <div className="flex gap-3">
            <Button
              onClick={resetSort}
              className="rounded-lg text-base h-12 flex-1/3"
              variant={'outline'}
            >
              초기화
            </Button>
            <Button
              className="flex-2/3 rounded-lg text-base h-12"
              onClick={() => setOpen(false)}
            >
              완료
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
