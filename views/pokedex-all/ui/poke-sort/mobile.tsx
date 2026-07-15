'use client';

import { useState } from 'react';

import { usePokeSort, SORT_OPTIONS } from '../../model/poke-sort';
import { getSortLabel } from './lib';

import {
  ControlRadioGroup,
  ControlRadioGroupItem,
  ControlRadioGroupLabel,
} from '../control/control-shared';
import {
  ControlSheet,
  ControlSheetBody,
  ControlSheetCloseButton,
  ControlSheetContent,
  ControlSheetContentGroup,
  ControlSheetContentGroupLabel,
  ControlSheetDescription,
  ControlSheetFooter,
  ControlSheetHeader,
  ControlSheetResetButton,
  ControlSheetTitle,
  ControlSheetTrigger,
} from '../control/control-sheet';
import { directionItems } from './direction-items';

export default function PokeSortMobile() {
  const [open, setOpen] = useState(false);
  const {
    sortKey,
    sortDir,
    isActive,
    changeSortKey,
    changeSortDir,
    resetSort,
  } = usePokeSort();

  const currentLabel = getSortLabel(sortKey, sortDir);

  return (
    <ControlSheet open={open} onOpenChange={setOpen}>
      <ControlSheetTrigger isActive={isActive} isOpen={open}>
        {currentLabel}
      </ControlSheetTrigger>
      <ControlSheetBody>
        <ControlSheetHeader>
          <ControlSheetTitle>정렬</ControlSheetTitle>
          <ControlSheetDescription>
            정렬 기준 및 방향 선택
          </ControlSheetDescription>
        </ControlSheetHeader>
        <ControlSheetContent>
          <ControlSheetContentGroup>
            <ControlSheetContentGroupLabel>
              정렬 기준
            </ControlSheetContentGroupLabel>
            <ControlRadioGroup
              className="grid grid-cols-2 gap-y-1.5"
              value={sortKey}
              onValueChange={changeSortKey}
            >
              {SORT_OPTIONS.map((option) => (
                <ControlRadioGroupLabel
                  className="h-10.5"
                  key={`sort-${option.key}`}
                  htmlFor={`sort-${option.key}`}
                >
                  <ControlRadioGroupItem
                    id={`sort-${option.key}`}
                    value={option.key}
                  />
                  {option.label}
                </ControlRadioGroupLabel>
              ))}
            </ControlRadioGroup>
          </ControlSheetContentGroup>

          <ControlSheetContentGroup>
            <ControlSheetContentGroupLabel>
              정렬 방향
            </ControlSheetContentGroupLabel>

            <ControlRadioGroup
              value={sortDir}
              onValueChange={changeSortDir}
              className="grid-cols-2 gap-y-1.5"
            >
              {directionItems.map((item) => (
                <ControlRadioGroupLabel
                  key={item.id}
                  htmlFor={item.id}
                  className="h-10.5"
                >
                  <ControlRadioGroupItem id={item.id} value={item.value} />
                  {item.content}
                </ControlRadioGroupLabel>
              ))}
            </ControlRadioGroup>
          </ControlSheetContentGroup>
        </ControlSheetContent>
        <ControlSheetFooter>
          <ControlSheetResetButton onClick={resetSort} />
          <ControlSheetCloseButton onClick={() => setOpen(false)} />
        </ControlSheetFooter>
      </ControlSheetBody>
    </ControlSheet>
  );
}
