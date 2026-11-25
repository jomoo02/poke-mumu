'use client';

import { useState } from 'react';

import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/_shared/ui/drawer';

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
 * 모바일 필터 드로어 (md 미만): 아래에서 올라오고 끌어 내려 닫는다.
 * 바텀시트처럼 좌우·바닥에 붙이고 위 모서리만 둥글게 (띄움 0). 높이 85dvh, 640px(max-w-160)에서 멈추고 sm 이상은 가운데.
 * 열린 채로 md 이상이 되면 닫는다 (트리거가 숨으므로)
 */
export default function FilterDrawer({
  resultLabel,
  filterCounts,
  triggerClassName,
}: FilterShellProps) {
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] =
    useState<MoveFilterGroup[]>(INITIAL_OPEN_GROUPS);

  const { selectedItems, resetFilters, isFilterActive } = useFilterParam();

  useCloseOutsideMedia('(max-width: 767px)', open, () => setOpen(false));

  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger
        render={
          <FilterTriggerButton
            selectedCount={selectedItems.length}
            className={triggerClassName}
          />
        }
      />
      <DrawerContent className="max-w-160 rounded-t-3xl rounded-b-none [--drawer-content-height:85dvh] [--drawer-inset:0px] sm:mx-auto">
        <DrawerHeader className="px-6 pt-2 pb-4 group-data-[swipe-axis=y]/drawer-popup:text-left">
          <DrawerTitle className="text-xl font-bold">
            {FILTER_TITLE}
          </DrawerTitle>
        </DrawerHeader>
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
      </DrawerContent>
    </Drawer>
  );
}
