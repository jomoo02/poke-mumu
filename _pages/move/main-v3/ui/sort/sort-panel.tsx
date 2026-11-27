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
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';

import { getSortLabel } from '../../model/sort';
import {
  BarButton,
  DESKTOP_QUERY,
  DRAWER_CONTENT_CLASS_NAME,
  DRAWER_HEADER_CLASS_NAME,
  MOBILE_QUERY,
} from '../panel';
import SortOptions from './sort-options';
import { SORT_TITLE, type SortProps } from './sort-props';

function SortButtonLabel(props: SortProps) {
  const label = getSortLabel(props.sortState);

  return { label, ariaLabel: `${SORT_TITLE}: ${label}` };
}

// md 미만: 정렬 드로어 (골라도 닫지 않는다. 끌어 내리거나 바깥을 눌러 닫는다)
function SortDrawer(props: SortProps) {
  const [open, setOpen] = useState(false);
  const { label, ariaLabel } = SortButtonLabel(props);

  useCloseOutsideMedia(MOBILE_QUERY, open, () => setOpen(false));

  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger
        render={
          <BarButton aria-label={ariaLabel} className="md:hidden">
            <span aria-hidden>{label}</span>
          </BarButton>
        }
      />
      <DrawerContent className={DRAWER_CONTENT_CLASS_NAME}>
        <DrawerHeader className={DRAWER_HEADER_CLASS_NAME}>
          <DrawerTitle className="text-xl font-bold">{SORT_TITLE}</DrawerTitle>
        </DrawerHeader>
        {/* 바닥에 붙으므로 아래 여백에 홈 표시줄 영역을 더한다 */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto no-scrollbar px-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <SortOptions {...props} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// md 이상: 버튼 아래 팝오버 (오른쪽 끝 버튼이라 오른쪽에 맞춘다)
function SortPopover(props: SortProps) {
  const [open, setOpen] = useState(false);
  const { label, ariaLabel } = SortButtonLabel(props);

  useCloseOutsideMedia(DESKTOP_QUERY, open, () => setOpen(false));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <BarButton aria-label={ariaLabel} className="max-md:hidden">
            <span aria-hidden>{label}</span>
          </BarButton>
        }
      />
      <PopoverContent align="end" sideOffset={8} className="w-64 gap-1 p-3">
        <PopoverTitle className="sr-only">{SORT_TITLE}</PopoverTitle>
        <SortOptions {...props} />
      </PopoverContent>
    </Popover>
  );
}

/**
 * 정렬 버튼 [이름순 ⌄]: 툴바의 개수 옆. md 미만은 드로어, md 이상은 팝오버 (트리거는 CSS로 하나만 보인다).
 * 고르는 즉시 반영되고 닫지 않는다 (기준과 방향을 이어서 고를 수 있게). lg 이상은 표 머리글로도 정렬한다
 */
export default function SortPanel(props: SortProps) {
  return (
    <>
      <SortDrawer {...props} />
      <SortPopover {...props} />
    </>
  );
}
