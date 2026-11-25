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

import { useFilterParam, type MoveFilterGroup } from '../../model/filter';
import FilterFooter from './parts/filter-footer';
import FilterGroupOptions from './parts/filter-group-options';
import { GROUP_TITLE } from './parts/filter-option';
import {
  BarButton,
  DESKTOP_QUERY,
  DRAWER_CONTENT_CLASS_NAME,
  DRAWER_HEADER_CLASS_NAME,
  MOBILE_QUERY,
} from '../panel';
import type { FilterProps } from './parts/filter-props';

interface GroupPanelProps extends FilterProps {
  group: MoveFilterGroup;
}

// [타입 ⌄] · 고르면 [타입 2 ⌄] 채움. 접근 이름 '타입 필터, 2개 선택됨'
function GroupButtonLabel(group: MoveFilterGroup, count: number) {
  return {
    label: count > 0 ? `${GROUP_TITLE[group]} ${count}` : GROUP_TITLE[group],
    ariaLabel:
      count > 0
        ? `${GROUP_TITLE[group]} 필터, ${count}개 선택됨`
        : `${GROUP_TITLE[group]} 필터`,
  };
}

// md 미만: 그 그룹만 담은 드로어 + 아래 [초기화(이 그룹)][N개 보기]
function GroupDrawer({ group, resultLabel, filterCounts }: GroupPanelProps) {
  const [open, setOpen] = useState(false);
  const { filter, resetFilterGroup } = useFilterParam();
  const count = filter[group].length;
  const { label, ariaLabel } = GroupButtonLabel(group, count);

  useCloseOutsideMedia(MOBILE_QUERY, open, () => setOpen(false));

  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger
        render={
          <BarButton
            active={count > 0}
            aria-label={ariaLabel}
            className="md:hidden"
          >
            <span aria-hidden>{label}</span>
          </BarButton>
        }
      />
      <DrawerContent className={DRAWER_CONTENT_CLASS_NAME}>
        <DrawerHeader className={DRAWER_HEADER_CLASS_NAME}>
          <DrawerTitle className="text-xl font-bold">
            {GROUP_TITLE[group]}
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto no-scrollbar px-6 pb-2">
          <FilterGroupOptions group={group} filterCounts={filterCounts} />
        </div>
        <FilterFooter
          canReset={count > 0}
          onReset={() => resetFilterGroup(group)}
          resultLabel={resultLabel}
          onDone={() => setOpen(false)}
        />
      </DrawerContent>
    </Drawer>
  );
}

// md 이상: 버튼 아래 팝오버 (그 그룹만, 바깥을 누르거나 Esc로 닫는다)
function GroupPopover({ group, filterCounts }: GroupPanelProps) {
  const [open, setOpen] = useState(false);
  const { filter, resetFilterGroup } = useFilterParam();
  const count = filter[group].length;
  const { label, ariaLabel } = GroupButtonLabel(group, count);

  useCloseOutsideMedia(DESKTOP_QUERY, open, () => setOpen(false));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <BarButton
            active={count > 0}
            aria-label={ariaLabel}
            className="max-md:hidden"
          >
            <span aria-hidden>{label}</span>
          </BarButton>
        }
      />
      <PopoverContent sideOffset={8} className="w-96 gap-3">
        <div className="flex items-center justify-between">
          <PopoverTitle className="font-semibold">
            {GROUP_TITLE[group]}
          </PopoverTitle>
          <button
            type="button"
            disabled={count === 0}
            onClick={() => resetFilterGroup(group)}
            className="cursor-pointer text-sm text-foreground/70 underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:no-underline"
          >
            초기화
          </button>
        </div>
        <FilterGroupOptions
          group={group}
          filterCounts={filterCounts}
          tileGridClassName="grid-cols-5"
        />
      </PopoverContent>
    </Popover>
  );
}

/**
 * 그룹 버튼 [타입 ⌄]: 그 그룹만 바로 고르는 바로가기. md 미만은 드로어, md 이상은 팝오버 (트리거는 CSS로 하나만 보인다).
 * 고르는 즉시 반영된다. 고른 값이 있으면 버튼을 채우고 개수를 붙인다
 */
export default function GroupPanel(props: GroupPanelProps) {
  return (
    <>
      <GroupDrawer {...props} />
      <GroupPopover {...props} />
    </>
  );
}
