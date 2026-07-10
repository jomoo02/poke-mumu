'use client';

import { useState } from 'react';

import { usePokeSort, SORT_OPTIONS } from '../../model/poke-sort';
import { getSortLabel } from './lib';
import { directionItems } from './direction-items';
import {
  ControlPopoverResetButton,
  ControlPopoverTitle,
  ControlPopoverTrigger,
  ControlPopover,
  ControlPopoverContent,
  ControlPopoverBody,
  ControlPopoverHeader,
  ControlPopoverContentGroup,
  ControlPopoverContentGroupLabel,
  ControlRadioGroup,
  ControlRadioGroupLabel,
  ControlRadioGroupItem,
} from '../control';

export default function PokeSortDesktop() {
  const { key, dir, isActive, changeSortKey, changeSortDir, resetSort } =
    usePokeSort();

  const [open, setOpen] = useState(false);

  const triggerText = getSortLabel(key, dir);

  const title = '정렬';

  return (
    <ControlPopover open={open} onOpenChange={setOpen}>
      <ControlPopoverTrigger isActive={isActive} isOpen={open}>
        {triggerText}
      </ControlPopoverTrigger>
      <ControlPopoverBody columnCount={2}>
        <ControlPopoverHeader>
          <ControlPopoverTitle>{title}</ControlPopoverTitle>
          <ControlPopoverResetButton isActive={isActive} onClick={resetSort} />
        </ControlPopoverHeader>
        <ControlPopoverContent>
          <ControlPopoverContentGroup>
            <ControlPopoverContentGroupLabel>
              정렬 기준
            </ControlPopoverContentGroupLabel>
            <ControlRadioGroup
              value={key}
              onValueChange={changeSortKey}
              className="grid-cols-2"
            >
              {SORT_OPTIONS.map((option) => (
                <ControlRadioGroupLabel
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
          </ControlPopoverContentGroup>
          <ControlPopoverContentGroup>
            <ControlPopoverContentGroupLabel>
              정렬 방향
            </ControlPopoverContentGroupLabel>
            <ControlRadioGroup
              value={dir}
              onValueChange={changeSortDir}
              className="grid-cols-2"
            >
              {directionItems.map((item) => (
                <ControlRadioGroupLabel key={item.id} htmlFor={item.id}>
                  <ControlRadioGroupItem id={item.id} value={item.value} />
                  {item.content}
                </ControlRadioGroupLabel>
              ))}
            </ControlRadioGroup>
          </ControlPopoverContentGroup>
        </ControlPopoverContent>
      </ControlPopoverBody>
    </ControlPopover>
  );
}
