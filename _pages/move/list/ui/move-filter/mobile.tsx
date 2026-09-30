'use client';

import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useMultiSelectParam } from '@/_shared/lib/search-params';
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

import MoveFilterOptions from './options';
import { getFilterTriggerText, type MoveFilterConfig } from './filter-config';
import { getMobileGrid } from './filter-layout';
import { PAGE_RESET_KEYS } from '../../config/search-params';

interface MoveFilterMobileProps {
  config: MoveFilterConfig;
}

export default function MoveFilterMobile({ config }: MoveFilterMobileProps) {
  const { selected, isSelected, isActive, toggle, reset } = useMultiSelectParam(
    config.paramKey,
    { resetKeys: PAGE_RESET_KEYS },
  );

  const [open, setOpen] = useState(false);

  const triggerText = getFilterTriggerText(config, selected);

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
          <SheetTitle>{config.title}</SheetTitle>
          <SheetDescription>{config.description}</SheetDescription>
        </SheetHeader>
        <div className="px-6 overflow-y-auto no-scrollbar">
          <MoveFilterOptions
            config={config}
            isSelected={isSelected}
            onToggle={toggle}
            className={cn(
              'grid gap-x-6 gap-y-1.5',
              getMobileGrid(config.columns),
            )}
            itemClassName="h-10.5"
          />
        </div>

        {/* 선택은 누르는 즉시 URL에 반영되므로 적용하기는 닫기만 한다 */}
        <SheetFooter className="flex flex-row">
          <SheetFooterButton
            variant="input"
            onClick={reset}
            className="flex-1/3"
          >
            초기화
          </SheetFooterButton>
          <SheetFooterButton
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
