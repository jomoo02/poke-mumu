'use client';

import { useState } from 'react';

import type { Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { FieldGroup } from '@/shared/ui/field';
import {
  ControlTriggerButton,
  ControlField,
  ControlFieldLabel,
} from '@/shared/ui/control';
import { cn } from '@/shared/lib/cn';

import useTypeFitler from './useTypeFilter';
import { getTypeTriggerText } from './lib';

interface TypeFilterMobileProps {
  types: Type[];
  max?: number;
}

export default function TypeFilterMobile({ types }: TypeFilterMobileProps) {
  const [open, setOpen] = useState(false);

  const { selectedTypes, isSelectedType, isActive, toggleType, resetType } =
    useTypeFitler();

  const triggerText = getTypeTriggerText([...selectedTypes], types);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <ControlTriggerButton
            variant={isActive ? 'active' : 'default'}
            data-scroll-item
          >
            {triggerText}
          </ControlTriggerButton>
        }
      />
      <SheetContent side={'bottom'} className="gap-0 max-h-[85dvh]">
        <SheetHeader>
          <SheetTitle>타입</SheetTitle>
        </SheetHeader>
        <div className="px-6 overflow-y-auto no-scrollbar">
          <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {types.map((type) => (
              <ControlField key={type.identifier} className={cn('h-10.5')}>
                <Checkbox
                  checked={isSelectedType(type.identifier)}
                  id={`type-${type.identifier}`}
                  name={`type-${type.identifier}`}
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
          </FieldGroup>
        </div>
        <SheetFooter className="flex flex-row">
          <SheetFooterButton
            variant="input"
            onClick={resetType}
            className="flex-1/3"
          >
            초기화
          </SheetFooterButton>
          <SheetFooterButton
            variant="primary"
            onClick={() => setOpen(false)}
            className="flex-2/3"
          >
            적용하기
          </SheetFooterButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
