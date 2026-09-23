'use client';

import { useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';
import { ControlTriggerButton } from '@/_shared/ui/control';

import { getSortLabel, useAbilitySort } from '../../model/ability-sort';
import AbilitySortOptions from './options';

export default function AbilitySortMobile() {
  const { sortState, isActive, resetSort, selectedId, selectSort } =
    useAbilitySort();

  const [open, setOpen] = useState(false);

  const triggerText = getSortLabel(sortState);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <ControlTriggerButton variant={isActive ? 'active' : 'default'}>
            {triggerText}
          </ControlTriggerButton>
        }
      />
      <SheetContent side={'bottom'} className="gap-0 max-h-[85dvh]">
        <SheetHeader>
          <SheetTitle>정렬</SheetTitle>
          <SheetDescription>정렬 선택</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <AbilitySortOptions
            value={selectedId}
            onValueChange={selectSort}
            className="grid gap-y-1.5"
            itemClassName="h-10.5"
          />
        </div>

        <SheetFooter className="flex flex-row">
          <SheetFooterButton
            variant="input"
            onClick={resetSort}
            className="flex-1/3"
          >
            초기화
          </SheetFooterButton>
          <SheetFooterButton onClick={() => setOpen(false)} className="flex-2/3">
            적용하기
          </SheetFooterButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
