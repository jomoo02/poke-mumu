'use client';

import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';
import { ControlTriggerButton, ControlResetButton } from '@/_shared/ui/control';

import { getSortLabel, useAbilitySort } from '../../model/ability-sort';
import AbilitySortOptions from './options';

export default function AbilitySortDesktop() {
  const { sortState, isActive, resetSort, selectedId, selectSort } =
    useAbilitySort();

  const [open, setOpen] = useState(false);

  const triggerText = getSortLabel(sortState);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <ControlTriggerButton variant={isActive ? 'active' : 'default'}>
            {triggerText}
          </ControlTriggerButton>
        }
      />
      <PopoverContent className={'w-58 max-h-100'} align="end">
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle>정렬</PopoverTitle>
          <ControlResetButton onClick={resetSort} disabled={!isActive} />
        </PopoverHeader>
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar p-2 -m-2">
          <AbilitySortOptions
            value={selectedId}
            onValueChange={selectSort}
            className="gap-x-6 gap-y-1"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
