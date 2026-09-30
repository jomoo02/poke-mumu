'use client';

import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';
import { ControlResetButton, ControlTriggerButton } from '@/_shared/ui/control';

import { getSortKeyLabel, useMoveSort } from '../../model/move-sort';
import SortKeyOptions from './sort-key-options';

export default function SortKeyDesktop() {
  const { sortState, isActive, setSortKey, resetSort } = useMoveSort();

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <ControlTriggerButton>
            {`정렬: ${getSortKeyLabel(sortState.sort)}`}
          </ControlTriggerButton>
        }
      />
      <PopoverContent className="w-100 max-h-100" align="end">
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle>정렬</PopoverTitle>
          <ControlResetButton onClick={resetSort} disabled={!isActive} />
        </PopoverHeader>
        {/* p-2 -m-2: 라디오 포커스 링이 스크롤 영역에 잘리지 않게 */}
        <div className="overflow-y-auto no-scrollbar p-2 -m-2">
          <SortKeyOptions
            value={sortState.sort}
            onValueChange={setSortKey}
            className="gap-x-6 gap-y-1"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
