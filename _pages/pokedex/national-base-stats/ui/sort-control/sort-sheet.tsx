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

import SortChoices, { SORT_TITLE, type SortPanelProps } from './sort-choices';
import SortTrigger from './sort-trigger';
import { useSortPanel } from './use-sort-panel';

// md 미만: 바텀시트. 아래엔 닫기만
export default function SortSheet({
  sortState,
  onSelectKey,
  onSelectOrder,
}: SortPanelProps) {
  const { open, onOpenChange, close, shownOrderSort } = useSortPanel(sortState);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        render={<SortTrigger sortState={sortState} className="md:hidden" />}
      />
      <SheetContent side="bottom" className="max-h-[85dvh] gap-0">
        <SheetHeader>
          <SheetTitle>{SORT_TITLE}</SheetTitle>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6">
          <SortChoices
            sortState={sortState}
            shownOrderSort={shownOrderSort}
            onSelectKey={onSelectKey}
            onSelectOrder={onSelectOrder}
            close={close}
            place="sheet"
          />
        </div>
        <SheetFooter>
          <SheetClose render={<SheetFooterButton variant="input" />}>
            닫기
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
