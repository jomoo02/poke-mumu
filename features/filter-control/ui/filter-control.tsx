'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/cn';
import type { SearchParamsStateOptions } from '@/shared/lib/search-params';
import { Checkbox } from '@/shared/ui/checkbox';
import { FieldGroup } from '@/shared/ui/field';
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
  ControlField,
  ControlFieldLabel,
  ControlResetButton,
} from '@/shared/ui/control';

import type { FilterConfig } from '../model/filter-option';
import { useFilterControl } from '../model/useFilterControl';

type Columns = NonNullable<FilterConfig['columns']>;

// columns → desktop 그리드+팝오버 폭 / mobile 그리드(최대 2열 클램프)
const DESKTOP_COLUMN: Record<Columns, { grid: string; width: string }> = {
  1: { grid: '', width: 'w-58 max-h-100' },
  2: { grid: 'grid grid-cols-2', width: 'w-114 max-h-100' },
  3: {
    grid: 'grid grid-cols-2 lg:grid-cols-3',
    width: 'w-114 lg:w-170 max-h-100',
  },
};

const MOBILE_COLUMN: Record<Columns, string> = {
  1: '',
  2: 'grid-cols-2',
  3: 'grid-cols-2',
};

function triggerText(config: FilterConfig, selected: string[]): string {
  const labels = selected
    .map((value) => config.options.find((o) => o.value === value)?.label)
    .filter((label): label is string => Boolean(label));

  const suffix =
    labels.length === 0
      ? (config.defaultTriggerLabel ?? '전체')
      : labels.join(', ');

  return `${config.title}: ${suffix}`;
}

interface FilterControlProps {
  config: FilterConfig;
  isMobile: boolean;
  // startTransition/resetKeys 주입(예: pokedex/all은 resetKeys:['page']).
  paramsOptions?: SearchParamsStateOptions;
}

export function FilterControl({
  config,
  isMobile,
  paramsOptions,
}: FilterControlProps) {
  const { selected, isSelected, isDisabled, isActive, toggle, reset } =
    useFilterControl(config, paramsOptions);

  const [open, setOpen] = useState(false);

  const columns = config.columns ?? 1;

  const options = (gridClassName: string, itemClassName?: string) => (
    <FieldGroup className={cn('gap-x-6 gap-y-1', gridClassName)}>
      {config.options.map((option) => {
        const id = `${config.key}-${option.value}`;
        const disabled = isDisabled(option.value);
        return (
          <ControlField
            key={option.value}
            className={cn(
              itemClassName,
              disabled ? 'hover:after:bg-transparent' : 'hover:after:bg-muted',
            )}
          >
            <Checkbox
              id={id}
              name={id}
              checked={isSelected(option.value)}
              disabled={disabled}
              className="cursor-pointer"
              onCheckedChange={() => toggle(option.value)}
            />
            <ControlFieldLabel htmlFor={id}>
              {option.icon}
              <span className="flex-1">{option.label}</span>
            </ControlFieldLabel>
          </ControlField>
        );
      })}
    </FieldGroup>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <ControlTriggerButton
              variant={isActive ? 'active' : 'default'}
              data-scroll-item
            >
              {triggerText(config, selected)}
            </ControlTriggerButton>
          }
        />
        <SheetContent side="bottom" className="gap-0 max-h-[85dvh]">
          <SheetHeader>
            <SheetTitle>{config.title}</SheetTitle>
            {config.description && (
              <SheetDescription>{config.description}</SheetDescription>
            )}
          </SheetHeader>
          <div className="px-6 overflow-y-auto no-scrollbar">
            {options(cn('grid gap-x-6 gap-y-1.5', MOBILE_COLUMN[columns]), 'h-10.5')}
          </div>
          <SheetFooter className="flex flex-row">
            <SheetFooterButton
              variant="input"
              onClick={reset}
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

  const { grid, width } = DESKTOP_COLUMN[columns];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <ControlTriggerButton
            variant={isActive ? 'active' : 'default'}
            data-scroll-item
          >
            {triggerText(config, selected)}
          </ControlTriggerButton>
        }
      />
      <PopoverContent className={width}>
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle className="flex items-center gap-1">
            <span>{config.title}</span>
            {config.max != null && (
              <span className="text-xs text-muted-foreground">{`(최대 ${config.max}개)`}</span>
            )}
          </PopoverTitle>
          <ControlResetButton onClick={reset} disabled={!isActive} />
        </PopoverHeader>
        <div className="overflow-y-auto no-scrollbar p-2 -m-2">
          {options(grid)}
        </div>
      </PopoverContent>
    </Popover>
  );
}
