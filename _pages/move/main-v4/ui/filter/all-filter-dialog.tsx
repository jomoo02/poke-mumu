'use client';

import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/ui/dialog';

import { MD_QUERY } from '../../lib/breakpoint';
import { useFilterParam } from '../../model/filter';
import AllFilterBody from './all-filter-body';
import AllFilterFooter from './all-filter-footer';
import AllFilterTrigger from './all-filter-trigger';
import { ALL_FILTER_TITLE, type AllFilterProps } from './filter-props';

// md 이상: 가운데 다이얼로그 (폭 512, 높이는 화면 85%까지, 안에서 스크롤). 타일 한 줄 5개
export default function AllFilterDialog({
  resultLabel,
  filterCounts,
}: AllFilterProps) {
  const [open, setOpen] = useState(false);
  const { selectedItems, resetFilters, isFilterActive } = useFilterParam();

  useCloseOutsideMedia(MD_QUERY, open, () => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <AllFilterTrigger
            selectedCount={selectedItems.length}
            className="max-md:hidden"
          />
        }
      />
      <DialogContent
        className={cn('flex max-h-[85dvh] flex-col gap-0 p-0 sm:max-w-lg')}
      >
        <DialogHeader className={cn('px-6 pt-6 pb-2')}>
          <DialogTitle className={cn('text-xl font-semibold')}>
            {ALL_FILTER_TITLE}
          </DialogTitle>
        </DialogHeader>
        <AllFilterBody
          filterCounts={filterCounts}
          tileGridClassName={cn('grid-cols-5')}
          className={cn('px-6')}
        />
        <AllFilterFooter
          canReset={isFilterActive}
          onReset={resetFilters}
          resultLabel={resultLabel}
          onDone={() => setOpen(false)}
          className={cn('px-6 pt-3 pb-6')}
        />
      </DialogContent>
    </Dialog>
  );
}
