'use client';

import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import { Button } from '@/_shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/_shared/ui/drawer';

import { MAX_MD_QUERY } from '../../lib/breakpoint';
import { getSortLabel } from '../../model/sort';
import SortOptionList from './sort-option-list';
import type { SortProps } from './sort-props';
import SortTrigger from './sort-trigger';

// md 미만: 정렬 드로어. 골라도 닫지 않는다 (고른 줄을 다시 눌러 방향을 바꿀 수 있게). 아래 [닫기]·끌어 내리기·바깥 누르기로 닫는다
export default function SortDrawer({
  sortState,
  onSelectKey,
  onSelectOrder,
}: SortProps) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia(MAX_MD_QUERY, open, () => setOpen(false));

  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger
        render={
          <SortTrigger
            label={getSortLabel(sortState)}
            className={cn('md:hidden')}
          />
        }
      />
      <DrawerContent
        className={cn(
          'max-w-160 rounded-t-3xl rounded-b-none [--drawer-inset:0px] sm:mx-auto',
        )}
      >
        <DrawerHeader className={cn('pb-4')}>
          <DrawerTitle className={cn('text-xl font-semibold')}>
            정렬
          </DrawerTitle>
        </DrawerHeader>
        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col overflow-y-auto no-scrollbar px-3 pb-3',
          )}
        >
          <SortOptionList
            sortState={sortState}
            onSelectKey={onSelectKey}
            onSelectOrder={onSelectOrder}
          />
        </div>
        {/* 바닥에 붙으므로 아래 여백에 홈 표시줄 영역을 더한다 */}
        <DrawerFooter
          className={cn('pb-[calc(1rem+env(safe-area-inset-bottom))]')}
        >
          <DrawerClose
            render={
              <Button
                className={cn('h-12 cursor-pointer rounded-lg text-base')}
              >
                닫기
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
