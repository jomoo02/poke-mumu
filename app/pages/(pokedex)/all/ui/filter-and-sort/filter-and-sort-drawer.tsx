'use client';

import { useState } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { XIcon } from 'lucide-react';

import { type Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';
import { DialogOverlay, DialogPortal } from '@/app/shared/ui/dialog';
import { cn } from '@/app/shared/lib/cn';

import { type SortOption } from '../../model';
import FilterAndSortDrawerTabs from './filter-and-sort-drawer-tabs';
import TypeFilterContent from './filter-and-sort-drawer-type-filter-content';
import SortContent from './filter-and-sort-drawer-sort-content';
import { TABS, useMediaQuery, type Tab } from './config';

const MAX_SELECTION = 2;

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allTypes: Type[];
  filterTypes: Type[];
  onToggleType: (type: Type) => void;
  sortOption: SortOption;
  onSortOptionChange: (sort: SortOption) => void;
  filteredCount: number;
  onResetConditions: () => void;
}

export default function FilterAndSortDrawer({
  open,
  onOpenChange,
  allTypes,
  filterTypes,
  onToggleType,
  sortOption,
  onSortOptionChange,
  filteredCount,
  onResetConditions,
}: FilterDrawerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('type');

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const filteredAllTypes = allTypes.filter(
    ({ identifier }) => identifier !== 'unknown',
  );

  const isMaxed = filterTypes.length >= MAX_SELECTION;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            'bg-popover fixed z-50 flex flex-col focus:outline-none',
            'data-open:animate-in data-closed:animate-out duration-300',
            isDesktop
              ? 'inset-y-0 right-0 w-100 border-l data-open:slide-in-from-right data-closed:slide-out-to-right'
              : 'inset-x-0 bottom-0 max-h-[75vh] h-full rounded-t-2xl data-open:slide-in-from-bottom data-closed:slide-out-to-bottom',
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <DialogPrimitive.Title className="text-lg font-semibold">
              필터 & 정렬
            </DialogPrimitive.Title>
            <div className="flex items-center gap-2">
              <DialogPrimitive.Close asChild>
                <Button variant="ghost" size="icon-lg">
                  <XIcon className="size-6.5 text-muted-foreground" />
                  <span className="sr-only">닫기</span>
                </Button>
              </DialogPrimitive.Close>
            </div>
          </div>
          <DialogPrimitive.Description className="sr-only">
            타입 필터와 정렬 기준을 설정합니다
          </DialogPrimitive.Description>
          <FilterAndSortDrawerTabs
            tabs={TABS}
            activeTabId={activeTab}
            setActiveTabId={setActiveTab}
          />

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {activeTab === 'type' ? (
              <TypeFilterContent
                allTypes={filteredAllTypes}
                selected={filterTypes}
                isMaxed={isMaxed}
                onToggle={onToggleType}
              />
            ) : (
              <SortContent
                sort={sortOption}
                onSortChange={onSortOptionChange}
              />
            )}
          </div>
          <div className="border-t px-6 py-4 flex gap-2">
            <Button
              onClick={onResetConditions}
              className="h-12.5 w-24 text-base text-muted-foreground"
              variant={'outline'}
            >
              초기화
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant={'default'}
              className="bg-foreground text-background font-semibold text-base flex-1 h-12.5"
            >
              {`${filteredCount.toLocaleString()} 마리의 포켓몬`}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}
