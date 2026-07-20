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
} from '@/shared/ui/sheet';
import {
  ControlTriggerButton,
  ControlRadioGroupLabel,
} from '@/shared/ui/control';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

import { usePokeSort, SORT_OPTIONS } from '../../model/poke-sort';
import { getSortLabel } from './lib';
import { directionItems } from './direction-items';

export default function PokeSortMobile() {
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
          <SheetTitle>정렬</SheetTitle>
          <SheetDescription>정렬 기준 및 방향 선택</SheetDescription>
        </SheetHeader>
        <div className="px-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-foreground/70">
              정렬 기준
            </div>
            <RadioGroup
              value={sortKey}
              onValueChange={changeSortKey}
              className="grid grid-cols-2 gap-x-6 gap-y-1.5"
            >
              {SORT_OPTIONS.map((option) => (
                <ControlRadioGroupLabel
                  key={`sort-${option.key}`}
                  htmlFor={`sort-${option.key}`}
                  className="h-10.5"
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
            <div className="text-sm font-medium text-foreground/70">
              정렬 방향
            </div>
            <RadioGroup
              value={sortDir}
              onValueChange={changeSortDir}
              className="grid grid-cols-2 gap-x-6 gap-y-1.5"
            >
              {directionItems.map((item) => (
                <ControlRadioGroupLabel
                  key={item.id}
                  htmlFor={item.id}
                  className="h-10.5"
                >
                  <RadioGroupItem id={item.id} value={item.value} />
                  {item.content}
                </ControlRadioGroupLabel>
              ))}
            </RadioGroup>
          </div>
        </div>
        <SheetFooter className="flex flex-row">
          <SheetFooterButton
            variant="input"
            onClick={resetSort}
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
