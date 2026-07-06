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

import usePokeSortView from './usePokeSortView';

export default function PokeSortDesktop() {
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
        <div className="flex flex-col gap-4 px-4 max-h-80 overflow-auto no-scrollbar">
          <div className="">
            <div className="text-xs font-medium text-muted-foreground pb-2.5">
              정렬 방향
            </div>
            <div className="grid grid-cols-2">
              <Button
                onClick={() => changeSortDir('asc')}
                aria-pressed={dir === 'asc'}
                variant={'outline'}
                className={cn(
                  'rounded-xl h-9.5  border-r rounded-r-none gap-1.5 px-3 cursor-pointer',
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
                  'rounded-xl h-9.5 border-l-0 rounded-l-none gap-1.5 px-3 cursor-pointer',
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
            <div className="text-xs font-medium text-muted-foreground pb-2.5">
              정렬 기준
            </div>
            <RadioGroup
              value={key}
              onValueChange={changeSortKey}
              className="gap-1"
            >
              {options.map((option) => (
                <Label
                  key={`sort-${option.key}`}
                  htmlFor={`sort-${option.key}`}
                  className={cn(
                    'relative isolate flex items-center gap-2.5 h-10 text-md cursor-pointer',
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
        <div className="border-t px-4">
          <div className="py-1.5">
            <Button
              onClick={resetSort}
              variant={'ghost'}
              className="h-8 text-foreground/70 px-2 gap-2 -mx-2"
            >
              <RotateCwIcon className="size-3.5" />
              초기화
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
