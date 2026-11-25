'use client';

import { useState } from 'react';

import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import { useFilterParam, type MoveFilterGroup } from '../../model/filter';
import FilterBody from './parts/filter-body';
import FilterFooter from './parts/filter-footer';
import {
  FILTER_TITLE,
  INITIAL_OPEN_GROUPS,
  type FilterShellProps,
} from './parts/filter-props';
import FilterTriggerButton from './parts/filter-trigger-button';

/**
 * 데스크탑 필터 시트 (md 이상): 오른쪽에서 열린다.
 * 열린 채로 md 미만이 되면 닫는다 (트리거가 숨으므로)
 */
export default function FilterSheet({
  resultLabel,
  filterCounts,
  triggerClassName,
}: FilterShellProps) {
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] =
    useState<MoveFilterGroup[]>(INITIAL_OPEN_GROUPS);

  const { selectedItems, resetFilters, isFilterActive } = useFilterParam();

  useCloseOutsideMedia('(min-width: 768px)', open, () => setOpen(false));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <FilterTriggerButton
            selectedCount={selectedItems.length}
            className={triggerClassName}
          />
        }
      />
      <SheetContent side="right" className="gap-0">
        <SheetHeader>
          <SheetTitle>{FILTER_TITLE}</SheetTitle>
        </SheetHeader>
        <FilterBody
          filterCounts={filterCounts}
          openGroups={openGroups}
          onOpenGroupsChange={setOpenGroups}
        />
        <FilterFooter
          canReset={isFilterActive}
          onReset={resetFilters}
          resultLabel={resultLabel}
          onDone={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
