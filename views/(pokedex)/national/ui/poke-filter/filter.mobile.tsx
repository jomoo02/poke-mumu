'use client';

import { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooterButton,
} from '@/shared/ui/sheet';
import {
  ControlTriggerButton,
  ControlField,
  ControlFieldLabel,
} from '@/shared/ui/control';
import { FieldGroup } from '@/shared/ui/field';

import { useMultiSelectFilter } from '../../model/poke-filter';
import type { FilterConfig } from '../../model/poke-filter';
import { getTriggerText, getMobileColumn } from './lib';
import { cn } from '@/shared/lib/cn';

export default function FilterMobile({ config }: { config: FilterConfig }) {
  const [open, setOpen] = useState(false);

  const { selected, isSelected, isDisabled, isActive, toggle, reset } =
    useMultiSelectFilter(config.paramKey, config.max);

  const triggerText = getTriggerText(config, selected);

  const column = getMobileColumn(config.columns);

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
          <SheetTitle>{config.title}</SheetTitle>
          <SheetDescription>{config.description}</SheetDescription>
        </SheetHeader>
        <div className="px-6 overflow-y-auto no-scrollbar">
          <FieldGroup className={cn('grid gap-x-6 gap-y-1.5', column)}>
            {config.items.map((item) => (
              <ControlField
                key={item.identifier}
                className={cn(
                  'h-10.5',
                  isDisabled(item.identifier)
                    ? 'hover:after:bg-transparent'
                    : 'hover:after:bg-muted',
                )}
              >
                <Checkbox
                  checked={isSelected(item.identifier)}
                  id={`${config.paramKey}-${item.identifier}`}
                  name={`${config.paramKey}-${item.identifier}`}
                  disabled={isDisabled(item.identifier)}
                  className="cursor-pointer"
                  onCheckedChange={() => toggle(item.identifier)}
                />
                <ControlFieldLabel
                  htmlFor={`${config.paramKey}-${item.identifier}`}
                >
                  {item.icon}
                  <span className="flex-1 text-md">{item.label}</span>
                </ControlFieldLabel>
              </ControlField>
            ))}
          </FieldGroup>
        </div>
        <SheetFooter className="flex flex-row">
          <SheetFooterButton
            variant={'input'}
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
