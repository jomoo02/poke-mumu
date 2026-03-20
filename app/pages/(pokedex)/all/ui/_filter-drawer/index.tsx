'use client';

import { useState, useEffect } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { XIcon } from 'lucide-react';
import { type Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';
import { DialogOverlay, DialogPortal } from '@/app/shared/ui/dialog';
import { cn } from '@/app/shared/lib/cn';
import { type SortOption, DEFAULT_SORT } from '../../model';
import DrawerTabs from './drawer-tabs';
import TypeFilterContent from './type-filter-content';
import SortContent from './sort-content';

const MAX_SELECTION = 2;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

type Tab = 'type' | 'sort';

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allTypes: Type[];
  selectedTypes: Type[];
  onToggleType: (type: Type) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  filteredCount: number;
  onResetConditions: () => void;
}

export default function FilterDrawer({
  open,
  onOpenChange,
  allTypes,
  selectedTypes,
  onToggleType,
  sort,
  onSortChange,
  filteredCount,
  onResetConditions,
}: FilterDrawerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('type');
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const filteredAllTypes = allTypes.filter(
    ({ identifier }) => identifier !== 'unknown',
  );

  const isMaxed = selectedTypes.length >= MAX_SELECTION;

  const handleResetAll = () => {
    onResetConditions();
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            'bg-background fixed z-50 flex flex-col focus:outline-none',
            'data-open:animate-in data-closed:animate-out duration-300',
            isDesktop
              ? 'inset-y-0 right-0 w-100 border-l data-open:slide-in-from-right data-closed:slide-out-to-right'
              : 'inset-x-0 bottom-0 max-h-[75vh] h-full rounded-t-2xl data-open:slide-in-from-bottom data-closed:slide-out-to-bottom',
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-4 pb-3">
            <DialogPrimitive.Title className="text-lg font-semibold">
              필터 · 정렬
            </DialogPrimitive.Title>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAll}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                초기화
              </button>
              <DialogPrimitive.Close asChild>
                <Button variant="ghost" size="icon-sm">
                  <XIcon className="size-4" />
                  <span className="sr-only">닫기</span>
                </Button>
              </DialogPrimitive.Close>
            </div>
          </div>
          <DialogPrimitive.Description className="sr-only">
            타입 필터와 정렬 기준을 설정합니다
          </DialogPrimitive.Description>
          <DrawerTabs
            tabs={[
              { id: 'type', label: '타입 필터' },
              { id: 'sort', label: '정렬 기준' },
            ]}
            activeTabId={activeTab}
            setActiveTabId={setActiveTab}
          />

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {activeTab === 'type' ? (
              <TypeFilterContent
                allTypes={filteredAllTypes}
                selected={selectedTypes}
                isMaxed={isMaxed}
                onToggle={onToggleType}
              />
            ) : (
              <SortContent sort={sort} onSortChange={onSortChange} />
            )}
          </div>

          <div className="border-t px-6 py-4">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-foreground font-semibold text-base w-full h-12"
            >
              {`${filteredCount.toLocaleString()}마리 포켓몬 보기`}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}
