'use client';

import { useState } from 'react';

import type { Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import { Checkbox } from '@/shared/ui/checkbox';

import { MAX_SELECTED_TYPES, useTypeFilter } from '../../model/type-filter';
import { getTypeTriggerText } from './lib';
import {
  ControlField,
  ControlFieldGroup,
  ControlFieldLabel,
} from '../control/control-shared';
import {
  ControlSheet,
  ControlSheetTrigger,
  ControlSheetBody,
  ControlSheetHeader,
  ControlSheetTitle,
  ControlSheetDescription,
  ControlSheetContent,
  ControlSheetFooter,
  ControlSheetResetButton,
  ControlSheetCloseButton,
  ControlSheetContentGroup,
} from '../control/control-sheet';
import { cn } from '@/shared/lib/cn';

interface TypeFilterMobileProps {
  types: Type[];
  max?: number;
}

export default function TypeFilterMobile({
  types,
  max = MAX_SELECTED_TYPES,
}: TypeFilterMobileProps) {
  const [open, setOpen] = useState(false);

  const {
    selectedTypes,
    isSelectedType,
    isDisabledType,
    isActive,
    toggleType,
    resetType,
  } = useTypeFilter(max);

  const triggerText = getTypeTriggerText(selectedTypes, types);
  const headerTitle = '타입';
  const headerDescription = `최대 ${max}개까지 선택 가능`;

  return (
    <ControlSheet open={open} onOpenChange={setOpen}>
      <ControlSheetTrigger isActive={isActive} isOpen={open}>
        {triggerText}
      </ControlSheetTrigger>
      <ControlSheetBody>
        <ControlSheetHeader>
          <ControlSheetTitle>{headerTitle}</ControlSheetTitle>
          <ControlSheetDescription>{headerDescription}</ControlSheetDescription>
        </ControlSheetHeader>
        <ControlSheetContent>
          <ControlSheetContentGroup>
            <ControlFieldGroup className="grid grid-cols-2 gap-y-1.5">
              {types.map((type) => (
                <ControlField
                  key={type.identifier}
                  className={cn(
                    'h-10.5',
                    isDisabledType(type.identifier)
                      ? 'hover:after:bg-transparent'
                      : 'hover:after:bg-muted',
                  )}
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
                    <TypeIcon
                      type={type}
                      className="size-7 p-0.5 rounded-md shrink-0"
                    />
                    <span className="flex-1">{type.nameKo}</span>
                  </ControlFieldLabel>
                </ControlField>
              ))}
            </ControlFieldGroup>
          </ControlSheetContentGroup>
        </ControlSheetContent>
        <ControlSheetFooter>
          <ControlSheetResetButton onClick={resetType} />
          <ControlSheetCloseButton onClick={() => setOpen(false)} />
        </ControlSheetFooter>
      </ControlSheetBody>
    </ControlSheet>
  );
}
