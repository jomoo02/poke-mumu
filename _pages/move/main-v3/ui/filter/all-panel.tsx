'use client';

import { useState } from 'react';

import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/_shared/ui/drawer';

import { useFilterParam } from '../../model/filter';
import type { SortProps } from '../sort';
import AllPanelBody from './parts/all-panel-body';
import FilterFooter from './parts/filter-footer';
import {
  DESKTOP_QUERY,
  DRAWER_CONTENT_CLASS_NAME,
  DRAWER_HEADER_CLASS_NAME,
  MOBILE_QUERY,
} from '../panel';
import { ALL_PANEL_TITLE, type FilterProps } from './parts/filter-props';
import FilterTriggerButton from './parts/filter-trigger-button';

interface AllPanelProps extends FilterProps {
  sort: SortProps;
}

// md 미만: 아래 드로어 (높이 85dvh, 끌어 내려 닫기)
function AllDrawer({ resultLabel, filterCounts, sort }: AllPanelProps) {
  const [open, setOpen] = useState(false);
  const { selectedItems, resetFilters, isFilterActive } = useFilterParam();

  useCloseOutsideMedia(MOBILE_QUERY, open, () => setOpen(false));

  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger
        render={
          <FilterTriggerButton
            selectedCount={selectedItems.length}
            className="md:hidden"
          />
        }
      />
      <DrawerContent
        className={`${DRAWER_CONTENT_CLASS_NAME} [--drawer-content-height:85dvh]`}
      >
        <DrawerHeader className={DRAWER_HEADER_CLASS_NAME}>
          <DrawerTitle className="text-xl font-bold">
            {ALL_PANEL_TITLE}
          </DrawerTitle>
        </DrawerHeader>
        <AllPanelBody filterCounts={filterCounts} sort={sort} />
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

// md 이상: 가운데 다이얼로그 (폭 512, 타일 5열, 높이는 화면 85%까지, 안에서 스크롤)
function AllDialog({ resultLabel, filterCounts, sort }: AllPanelProps) {
  const [open, setOpen] = useState(false);
  const { selectedItems, resetFilters, isFilterActive } = useFilterParam();

  useCloseOutsideMedia(DESKTOP_QUERY, open, () => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <FilterTriggerButton
            selectedCount={selectedItems.length}
            className="max-md:hidden"
          />
        }
      />
      <DialogContent className="flex max-h-[85dvh] flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            {ALL_PANEL_TITLE}
          </DialogTitle>
        </DialogHeader>
        <AllPanelBody
          filterCounts={filterCounts}
          sort={sort}
          tileGridClassName="grid-cols-5"
        />
        <FilterFooter
          canReset={isFilterActive}
          onReset={resetFilters}
          resultLabel={resultLabel}
          onDone={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

/**
 * 전체 패널 [⚙]: 필터 그룹을 모두 펼친 채 + 맨 아래 정렬. md 미만은 드로어, md 이상은 다이얼로그.
 * 둘 다 그리고 트리거를 CSS로 하나만 보인다 (첫 화면부터 맞는 트리거). 닫힌 패널은 트리거만 그린다.
 * 열린 채로 화면 구간을 넘으면 닫는다 (트리거가 숨으므로)
 */
export default function AllPanel(props: AllPanelProps) {
  return (
    <>
      <AllDrawer {...props} />
      <AllDialog {...props} />
    </>
  );
}
