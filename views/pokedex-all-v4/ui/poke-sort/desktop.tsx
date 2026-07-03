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
    isActive,
    changeKey,
    changeDir,
    reset,
  } = useSort();

  return (
    <Popover>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent align="start" className="z-1 px-0 py-3.5 pb-0 w-58">
        <div className="flex flex-col gap-1 px-4 max-h-80 overflow-auto no-scrollbar">
          <div className="pb-2 pt-1">
            {/* <div className="text-sm font-medium text-foreground/70 pb-3">
              정렬 방향
            </div> */}
            <div className="grid grid-cols-2">
              <Button
                onClick={() => changeDir('asc')}
                aria-pressed={dir === 'asc'}
                aria-label={ascLabel}
                title={ascLabel}
                variant={'outline'}
                className={cn(
                  'rounded-lg h-9.5  border-r rounded-r-none gap-1.5 px-3',
                  dir === 'asc'
                    ? 'bg-muted dark:bg-input hover:bg-muted dark:hover:bg-input'
                    : 'bg-transparent hover:bg-muted/70',
                )}
              >
                오름차순
                <ArrowUpIcon className="size-4" />
              </Button>
              <Button
                onClick={() => changeDir('desc')}
                aria-pressed={dir === 'desc'}
                aria-label={descLabel}
                title={descLabel}
                variant={'outline'}
                className={cn(
                  'rounded-lg h-9.5 border-l-0 rounded-l-none gap-1.5 px-3',
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
