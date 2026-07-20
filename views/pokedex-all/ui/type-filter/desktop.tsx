'use client';

import { useState } from 'react';

import type { Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/shared/ui/popover';
import { FieldGroup } from '@/shared/ui/field';
import {
  ControlTriggerButton,
  ControlField,
  ControlFieldLabel,
  ControlResetButton,
} from '@/shared/ui/control';

import { MAX_SELECTED_TYPES, useTypeFilter } from '../../model/type-filter';
import { getTypeTriggerText } from './lib';

interface TypeFilterDesktopProps {
  types: Type[];
  max?: number;
}

export default function TypeFilterDesktop({
  types,
  max = MAX_SELECTED_TYPES,
}: TypeFilterDesktopProps) {
  const {
    selectedTypes,
    isSelectedType,
    isDisabledType,
    isActive,
    toggleType,
    resetType,
  } = useTypeFilter(max);

  const [open, setOpen] = useState(false);

  const triggerText = getTypeTriggerText(selectedTypes, types);

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
      <PopoverContent className={'w-114 max-h-100'}>
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle className="flex items-center gap-1">
            <span>타입</span>
            <span className="text-xs text-muted-foreground">{`(최대 ${max}개)`}</span>
          </PopoverTitle>
          <ControlResetButton onClick={resetType} disabled={!isActive} />
        </PopoverHeader>
        <div className="overflow-y-auto no-scrollbar p-2 -m-2">
          <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-1">
            {types.map((type) => (
              <ControlField
                key={type.identifier}
                className={
                  isDisabledType(type.identifier)
                    ? 'hover:after:bg-transparent'
                    : 'hover:after:bg-muted'
                }
              >
                <Checkbox
                  checked={isSelectedType(type.identifier)}
                  id={`type-${type.identifier}`}
                  name={`type-${type.identifier}`}
                  disabled={isDisabledType(type.identifier)}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleType(type.identifier)}
                />
                <ControlFieldLabel htmlFor={`type-${type.identifier}`}>
                  <TypeIcon type={type} className="size-7 p-0.5 rounded-md" />
                  <span className="flex-1">{type.nameKo}</span>
                </ControlFieldLabel>
              </ControlField>
            ))}
          </FieldGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
