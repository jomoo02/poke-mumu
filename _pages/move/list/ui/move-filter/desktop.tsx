'use client';

import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useMultiSelectParam } from '@/_shared/lib/search-params';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';
import { ControlTriggerButton, ControlResetButton } from '@/_shared/ui/control';

import MoveFilterOptions from './options';
import { getFilterTriggerText, type MoveFilterConfig } from './filter-config';
import { getDesktopLayout } from './filter-layout';
import { PAGE_RESET_KEYS } from '../../config/search-params';

interface MoveFilterDesktopProps {
  config: MoveFilterConfig;
}

export default function MoveFilterDesktop({ config }: MoveFilterDesktopProps) {
  const { selected, isSelected, isActive, toggle, reset } = useMultiSelectParam(
    config.paramKey,
    { resetKeys: PAGE_RESET_KEYS },
  );

  const [open, setOpen] = useState(false);

  const triggerText = getFilterTriggerText(config, selected);

  const { grid, width } = getDesktopLayout(config.columns);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <ControlTriggerButton variant={isActive ? 'active' : 'default'}>
            {triggerText}
          </ControlTriggerButton>
        }
      />
      <PopoverContent className={width}>
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle>{config.title}</PopoverTitle>
          <ControlResetButton onClick={reset} disabled={!isActive} />
        </PopoverHeader>
        {/* p-2 -m-2: 체크박스 포커스 링이 스크롤 영역에 잘리지 않게 */}
        <div className="overflow-y-auto no-scrollbar p-2 -m-2">
          <MoveFilterOptions
            config={config}
            isSelected={isSelected}
            onToggle={toggle}
            className={cn('gap-x-6 gap-y-1', grid)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
