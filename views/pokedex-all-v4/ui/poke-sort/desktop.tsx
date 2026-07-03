'use client';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  RotateCwIcon,
} from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

import useSort from '../../model/useSort';

export default function PokeSortDesktop() {
  const {
    key,
    dir,
    options,
    currentLabel,
    ascLabel,
    descLabel,
    changeKey,
    changeDir,
    reset,
  } = useSort();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          className=" bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input h-10.5"
        >
          <span>정렬: {currentLabel}</span>
          <ChevronDownIcon className="size-4.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-1 px-0 py-3.5 pb-0 w-58">
        <div className="px-4 flex justify-between items-center">
          <div className="text-sm font-medium">정렬 방향</div>
          <div className="inline-flex">
            <Button
              onClick={() => changeDir('asc')}
              aria-pressed={dir === 'asc'}
              aria-label={ascLabel}
              title={ascLabel}
              variant={'outline'}
              className={cn(
                'rounded-lg h-8.5 w-9 border-r rounded-r-none',
                dir === 'asc'
                  ? 'bg-muted dark:bg-input hover:bg-muted dark:hover:bg-input'
                  : 'bg-transparent hover:bg-muted/70',
              )}
            >
              <ArrowUpIcon className="size-4.5" />
            </Button>
            <Button
              onClick={() => changeDir('desc')}
              aria-pressed={dir === 'desc'}
              aria-label={descLabel}
              title={descLabel}
              variant={'outline'}
              className={cn(
                'rounded-lg h-8.5 w-9 border-l-0 rounded-l-none',
                dir === 'desc'
                  ? 'bg-muted dark:bg-input hover:bg-muted dark:hover:bg-input'
                  : 'bg-transparent hover:bg-muted/70',
              )}
            >
              <ArrowDownIcon className="size-4.5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-4 max-h-80 overflow-auto no-scrollbar">
          <RadioGroup value={key} onValueChange={changeKey} className="gap-1">
            {options.map((option) => (
              <Label
                key={option.key}
                htmlFor={option.key}
                className={cn(
                  'relative isolate flex items-center gap-2.5 h-10 text-md',
                  'after:absolute after:inset-y-0 after:-inset-x-2 after:-z-10 after:rounded-lg hover:after:bg-muted',
                )}
              >
                <RadioGroupItem id={option.key} value={option.key} />
                {option.label}
              </Label>
            ))}
          </RadioGroup>
        </div>
        <div className="border-t px-4">
          <div className="py-1.5">
            <Button
              onClick={reset}
              variant={'ghost'}
              className="h-8 text-foreground/70 px-2 gap-2 -mx-2"
            >
              <RotateCwIcon className="size-4" />
              초기화
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
