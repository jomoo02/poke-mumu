'use client';

import { useState } from 'react';

import type { SearchParamsStateOptions } from '@/shared/lib/search-params';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/shared/ui/popover';
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
  ControlResetButton,
  ControlRadioGroupLabel,
} from '@/shared/ui/control';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

import type { SortConfig, SortDir } from '../model/sort-option';
import { useSortControl } from '../model/useSortControl';
import { getSortLabel } from '../model/get-sort-label';
import { directionItems } from './direction-items';

interface SortControlProps<T> {
  config: SortConfig<T>;
  isMobile: boolean;
  // startTransition/resetKeys 주입(예: pokedex/all은 resetKeys:['page']).
  paramsOptions?: SearchParamsStateOptions;
}

const TITLE = '정렬';

// 기준/방향 라디오 섹션 (desktop·mobile 공용 본문)
function SortSections<T>({
  config,
  sortKey,
  sortDir,
  changeSortKey,
  changeSortDir,
  labelClassName,
}: {
  config: SortConfig<T>;
  sortKey: string;
  sortDir: SortDir;
  changeSortKey: (key: string) => void;
  changeSortDir: (dir: SortDir) => void;
  labelClassName?: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-xs text-foreground/70 font-medium">정렬 기준</div>
        <RadioGroup
          value={sortKey}
          onValueChange={changeSortKey}
          className="gap-x-6 gap-y-1 grid-cols-2"
        >
          {config.options.map((option) => (
            <ControlRadioGroupLabel
              key={`sort-${option.key}`}
              htmlFor={`sort-${option.key}`}
              className={labelClassName}
            >
              <RadioGroupItem id={`sort-${option.key}`} value={option.key} />
              {option.label}
            </ControlRadioGroupLabel>
          ))}
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-xs text-foreground/70 font-medium">정렬 방향</div>
        <RadioGroup
          value={sortDir}
          onValueChange={(value) => changeSortDir(value as SortDir)}
          className="gap-x-6 gap-y-1 grid-cols-2"
        >
          {directionItems.map((item) => (
            <ControlRadioGroupLabel
              key={item.id}
              htmlFor={item.id}
              className={labelClassName}
            >
              <RadioGroupItem id={item.id} value={item.value} />
              {item.content}
            </ControlRadioGroupLabel>
          ))}
        </RadioGroup>
      </div>
    </>
  );
}

export function SortControl<T>({
  config,
  isMobile,
  paramsOptions,
}: SortControlProps<T>) {
  const { sortKey, sortDir, isActive, changeSortKey, changeSortDir, resetSort } =
    useSortControl(config, paramsOptions);

  const [open, setOpen] = useState(false);

  const triggerText = getSortLabel(config, sortKey, sortDir);

  if (isMobile) {
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
        <SheetContent side="bottom" className="gap-0 max-h-[85dvh]">
          <SheetHeader>
            <SheetTitle>{TITLE}</SheetTitle>
            <SheetDescription>정렬 기준 및 방향 선택</SheetDescription>
          </SheetHeader>
          <div className="px-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
            <SortSections
              config={config}
              sortKey={sortKey}
              sortDir={sortDir}
              changeSortKey={changeSortKey}
              changeSortDir={changeSortDir}
              labelClassName="h-10.5"
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
      <PopoverContent className="w-114 max-h-100">
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle>{TITLE}</PopoverTitle>
          <ControlResetButton onClick={resetSort} disabled={!isActive} />
        </PopoverHeader>
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar p-2 -m-2">
          <SortSections
            config={config}
            sortKey={sortKey}
            sortDir={sortDir}
            changeSortKey={changeSortKey}
            changeSortDir={changeSortDir}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
