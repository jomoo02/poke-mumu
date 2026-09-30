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
} from '@/_shared/ui/sheet';
import { ControlTriggerButton } from '@/_shared/ui/control';

import { getSortKeyLabel, useMoveSort } from '../../model/move-sort';
import SortKeyOptions from './sort-key-options';

export default function SortKeyMobile() {
  const { sortState, setSortKey, resetSort } = useMoveSort();

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <ControlTriggerButton>
            {`정렬: ${getSortKeyLabel(sortState.sort)}`}
          </ControlTriggerButton>
        }
      />
      <SheetContent side="bottom" className="gap-0 max-h-[85dvh]">
        <SheetHeader>
          <SheetTitle>정렬</SheetTitle>
          <SheetDescription>기술 정렬 기준 선택</SheetDescription>
        </SheetHeader>
        <div className="px-6 overflow-y-auto no-scrollbar">
          <SortKeyOptions
            value={sortState.sort}
            onValueChange={setSortKey}
            className="gap-x-6 gap-y-1.5 grid-cols-1"
            itemClassName="h-10.5"
          />
        </div>

        {/* 선택은 누르는 즉시 URL에 반영되므로 적용하기는 닫기만 한다 */}
        <SheetFooter className="flex flex-row">
          <SheetFooterButton
            variant="input"
            onClick={resetSort}
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
