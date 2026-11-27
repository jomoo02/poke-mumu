'use client';

import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';

import { MD_QUERY } from '../../lib/breakpoint';
import { getSortLabel } from '../../model/sort';
import SortOptionList from './sort-option-list';
import type { SortProps } from './sort-props';
import SortTrigger from './sort-trigger';

// md 이상: 버튼 아래 팝오버 (오른쪽 끝 버튼이라 오른쪽에 맞춘다). modal: 열린 동안 페이지 스크롤·바깥 조작을 막는다 (필터 팝오버와 같다)
export default function SortPopover({
  sortState,
  onSelectKey,
  onSelectOrder,
}: SortProps) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia(MD_QUERY, open, () => setOpen(false));

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger
        render={
          <SortTrigger
            label={getSortLabel(sortState)}
            className={cn('max-md:hidden')}
          />
        }
      />
      <PopoverContent align="end" className={cn('w-64 gap-1 px-2 py-2.5')}>
        <PopoverTitle className={cn('sr-only')}>정렬</PopoverTitle>
        <SortOptionList
          sortState={sortState}
          onSelectKey={onSelectKey}
          onSelectOrder={onSelectOrder}
        />
      </PopoverContent>
    </Popover>
  );
}
