'use client';

import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/_shared/ui/drawer';

import { MAX_MD_QUERY } from '../../lib/breakpoint';
import { useFilterParam } from '../../model/filter';
import AllFilterBody from './all-filter-body';
import AllFilterFooter from './all-filter-footer';
import AllFilterTrigger from './all-filter-trigger';
import { ALL_FILTER_TITLE, type AllFilterProps } from './filter-props';

// md 미만: 아래 드로어 (높이 85dvh, 끌어 내려 닫기). 타일 한 줄 4개
export default function AllFilterDrawer({
  resultLabel,
  filterCounts,
}: AllFilterProps) {
  const [open, setOpen] = useState(false);
  const { selectedItems, resetFilters, isFilterActive } = useFilterParam();

  useCloseOutsideMedia(MAX_MD_QUERY, open, () => setOpen(false));

  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger
        render={
          <AllFilterTrigger
            selectedCount={selectedItems.length}
            // 툴바 첫 줄에서 검색창(44px) 옆에 놓이므로 같은 높이
            className={cn('size-11 md:hidden')}
          />
        }
      />
      <DrawerContent
        className={cn(
          'max-w-160 rounded-t-3xl rounded-b-none [--drawer-content-height:85dvh] [--drawer-inset:0px] sm:mx-auto',
        )}
      >
        <DrawerHeader className={cn('pb-4')}>
          <DrawerTitle className={cn('text-xl font-semibold')}>
            {ALL_FILTER_TITLE}
          </DrawerTitle>
        </DrawerHeader>
        <AllFilterBody filterCounts={filterCounts} className={cn('px-6')} />
        {/* 바닥에 붙으므로 아래 여백에 홈 표시줄 영역을 더한다 */}
        <AllFilterFooter
          canReset={isFilterActive}
          onReset={resetFilters}
          resultLabel={resultLabel}
          onDone={() => setOpen(false)}
          className={cn(
            'px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]',
          )}
        />
      </DrawerContent>
    </Drawer>
  );
}
