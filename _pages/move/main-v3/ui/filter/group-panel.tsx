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
import { Popover, PopoverContent, PopoverTrigger } from '@/_shared/ui/popover';

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

/**
 * 팝오버 폭: 타일 하나 84px 기준 (타일 × n + 간격 10 × (n-1) + 안쪽 여백 16 × 2)
 *   타입 5열 = 420 + 40 + 32 = 492px (w-123)
 *   분류 3열 = 252 + 20 + 32 = 304px (w-76)
 */
const POPOVER_LAYOUT: Record<MoveFilterGroup, { width: string; grid: string }> =
  {
    type: { width: 'w-123', grid: 'grid-cols-5' },
    damageClass: { width: 'w-76', grid: 'grid-cols-3' },
  };

// md 이상: 버튼 아래 팝오버 (그 그룹 선택지만, 제목·초기화 없음. 바깥을 누르거나 Esc로 닫는다)
function GroupPopover({ group, filterCounts }: GroupPanelProps) {
  const [open, setOpen] = useState(false);
  const { filter } = useFilterParam();
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
      <PopoverContent
        aria-label={GROUP_TITLE[group]}
        className={cn(POPOVER_LAYOUT[group].width, 'p-3')}
      >
        <FilterGroupOptions
          group={group}
          filterCounts={filterCounts}
          tileGridClassName={POPOVER_LAYOUT[group].grid}
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
