'use client';

import type { Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import { Checkbox } from '@/shared/ui/checkbox';

import { MAX_SELECTED_TYPES, useTypeFilter } from '../../model/type-filter';
import { getTypeTriggerText } from './lib';
import {
  ControlPopover,
  ControlPopoverTrigger,
  ControlPopoverBody,
  ControlPopoverHeader,
  ControlPopoverTitle,
  ControlPopoverContent,
  ControlPopoverResetButton,
  ControlFieldGroup,
  ControlField,
  ControlFieldLabel,
  ControlPopoverContentGroup,
} from '../control';
import { useState } from 'react';

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
    <ControlPopover open={open} onOpenChange={setOpen}>
      <ControlPopoverTrigger isActive={isActive} isOpen={open}>
        {triggerText}
      </ControlPopoverTrigger>
      <ControlPopoverBody columnCount={2}>
        <ControlPopoverHeader>
          <ControlPopoverTitle className="flex items-center gap-1">
            <span>타입</span>
            <span className="text-xs text-muted-foreground">{`(최대 ${max}개)`}</span>
          </ControlPopoverTitle>
          <ControlPopoverResetButton onClick={resetType} isActive={isActive} />
        </ControlPopoverHeader>
        <ControlPopoverContent>
          <ControlPopoverContentGroup>
            <ControlFieldGroup className="grid-cols-2">
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
                    className="cursor-pointer size-5"
                    onCheckedChange={() => toggleType(type.identifier)}
                  />
                  <ControlFieldLabel htmlFor={`type-${type.identifier}`}>
                    <TypeIcon
                      type={type}
                      className="size-6.75 p-0.5 rounded-md"
                    />
                    <span className="flex-1">{type.nameKo}</span>
                  </ControlFieldLabel>
                </ControlField>
              ))}
            </ControlFieldGroup>
          </ControlPopoverContentGroup>
        </ControlPopoverContent>
      </ControlPopoverBody>
    </ControlPopover>
  );
}
