'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import SortOptionList from './sort-option-list';
import { SORT_TITLE, type SortPanelProps } from './sort-panel';
import SortTrigger from './sort-trigger';
import { useSortPanel } from './use-sort-panel';

// md 미만: 바텀시트. 아래엔 닫기만
export default function SortSheet({ sortState, onToggle }: SortPanelProps) {
  const { open, onOpenChange, close } = useSortPanel();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        render={<SortTrigger sortState={sortState} className="md:hidden" />}
      />
      <SheetContent side="bottom" className="max-h-[90dvh] gap-0">
        <SheetHeader>
          <SheetTitle>{SORT_TITLE}</SheetTitle>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6">
          <SortOptionList
            sortState={sortState}
            onToggle={onToggle}
            close={close}
            place="sheet"
          />
        </div>
        <SheetFooter className="pt-0">
          {/* <SheetClose render={<SheetFooterButton variant="input" />}>
            닫기
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
