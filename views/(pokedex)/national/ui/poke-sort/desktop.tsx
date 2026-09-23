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

import { getSortLabel } from './lib';
import { usePokeSort, SORT_OPTIONS } from '../../model/poke-sort';

export default function PokeSortDesktop() {
  const { sort, isActive, changeSortKey, resetSort } = usePokeSort();

  const [open, setOpen] = useState(false);

  const triggerText = getSortLabel(sort || '');

  const title = '정렬';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <ControlTriggerButton
            variant={isActive ? 'active' : 'default'}
            data-scroll-item
          >
            {triggerText}
          </ControlTriggerButton>
        }
      />
      <PopoverContent className={'w-58 max-h-100'}>
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle>{title}</PopoverTitle>
          <ControlResetButton onClick={resetSort} disabled={!isActive} />
        </PopoverHeader>
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar p-2 -m-2">
          <div className="flex flex-col gap-2">
            <RadioGroup
              value={sort}
              onValueChange={changeSortKey}
              className="gap-x-6 gap-y-1"
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
