'use client';

import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/shared/ui/popover';
import {
  ControlTriggerButton,
  ControlResetButton,
  ControlRadioGroupLabel,
} from '@/shared/ui/control';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

import { usePokeSort, SORT_OPTIONS } from '../../model/poke-sort';
import { getSortLabel } from './lib';
import { directionItems } from './direction-items';

export default function PokeSortDesktop() {
  const {
    sortKey,
    sortDir,
    isActive,
    changeSortKey,
    changeSortDir,
    resetSort,
  } = usePokeSort();

  const [open, setOpen] = useState(false);

  const triggerText = getSortLabel(sortKey, sortDir);

  const title = '정렬';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <ControlTriggerButton variant={isActive ? 'active' : 'default'}>
            {triggerText}
          </ControlTriggerButton>
        }
      />
      <PopoverContent className={'w-114 max-h-100'}>
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle>{title}</PopoverTitle>
          <ControlResetButton onClick={resetSort} disabled={!isActive} />
        </PopoverHeader>
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar p-2 -m-2">
          <div className="flex flex-col gap-2">
            <div className="text-xs text-foreground/70 font-medium">
              정렬 기준
            </div>
            <RadioGroup
              value={sortKey}
              onValueChange={changeSortKey}
              className="gap-x-6 gap-y-1 grid-cols-2"
            >
              {SORT_OPTIONS.map((option) => (
                <ControlRadioGroupLabel
                  key={`sort-${option.key}`}
                  htmlFor={`sort-${option.key}`}
                >
                  <RadioGroupItem
                    id={`sort-${option.key}`}
                    value={option.key}
                  />
                  {option.label}
                </ControlRadioGroupLabel>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xs text-foreground/70 font-medium">
              정렬 방향
            </div>
            <RadioGroup
              value={sortDir}
              onValueChange={changeSortDir}
              className="gap-x-6 gap-y-1 grid-cols-2"
            >
              {directionItems.map((item) => (
                <ControlRadioGroupLabel key={item.id} htmlFor={item.id}>
                  <RadioGroupItem id={item.id} value={item.value} />
                  {item.content}
                </ControlRadioGroupLabel>
              ))}
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
