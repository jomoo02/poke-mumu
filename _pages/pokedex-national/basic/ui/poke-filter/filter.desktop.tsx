import { useState } from 'react';

import { cn } from '@/shared/lib/cn';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/shared/ui/popover';
import { FieldGroup } from '@/shared/ui/field';
import {
  ControlTriggerButton,
  ControlField,
  ControlFieldLabel,
  ControlResetButton,
} from '@/shared/ui/control';

import { getTriggerText, getDesktopColumn } from './lib';
import { useMultiSelectFilter } from '../../model/poke-filter';
import type { FilterConfig } from '../../model/poke-filter';

export default function FilterDesktop({ config }: { config: FilterConfig }) {
  const { selected, isSelected, isDisabled, isActive, toggle, reset } =
    useMultiSelectFilter(config.paramKey, config.max);

  const [open, setOpen] = useState(false);

  const triggerText = getTriggerText(config, selected);

  const { grid, width } = getDesktopColumn(config.columns);

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
          <FieldGroup className={cn('gap-x-6 gap-y-1', grid)}>
            {config.items.map((item) => (
              <ControlField
                key={item.identifier}
                className={
                  isDisabled(item.identifier)
                    ? 'hover:after:bg-transparent'
                    : 'hover:after:bg-muted'
                }
              >
                <Checkbox
                  checked={isSelected(item.identifier)}
                  id={`${config.paramKey}-${item.identifier}`}
                  disabled={isDisabled(item.identifier)}
                  name={`${config.paramKey}-${item.identifier}`}
                  className="cursor-pointer"
                  onCheckedChange={() => toggle(item.identifier)}
                />
                <ControlFieldLabel
                  htmlFor={`${config.paramKey}-${item.identifier}`}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                </ControlFieldLabel>
              </ControlField>
            ))}
          </FieldGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
