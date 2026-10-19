'use client';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
// 기존 정렬 메뉴의 바텀시트·셀렉트를 그대로 쓴다 (방향 칸이 없는 한 덩어리 트리거만 새로)
import { SortKeySheet } from '@/_shared/ui/sort-menu/sort-key-sheet';
import { SortKeySelect } from '@/_shared/ui/sort-menu/sort-key-select';

import { MODE_SORT_OPTIONS, useModeSort } from '../model/use-mode-sort';

// _shared/ui/sort-menu의 기준 칸과 같은 모양 (방향 칸이 없어 양쪽 모두 둥글다)
const TRIGGER_CLASS = cn(
  'group h-10 gap-1.5 rounded-4xl border border-border pr-3 pl-4 text-sm font-medium text-foreground transition-none',
  'cursor-pointer bg-transparent dark:bg-input/50',
  '[@media(hover:hover)]:hover:bg-muted dark:[@media(hover:hover)]:hover:bg-input/70',
  'active:bg-muted dark:active:bg-input/70',
  'aria-expanded:bg-muted dark:aria-expanded:bg-input/70',
);

// [정렬: 도감번호순 ▾] 도감번호·이름은 방향까지 선택지에 담고, 능력치는 '능력치순' 하나.
// 능력치순이면 표 머리글이 나타나 어떤 능력치·방향인지 거기서 고른다
export default function ModeSortMenu() {
  const { selectedKey, select } = useModeSort();

  const selected =
    MODE_SORT_OPTIONS.find((option) => option.key === selectedKey) ??
    MODE_SORT_OPTIONS[0];

  const trigger = (
    <Button
      type="button"
      aria-label={`정렬: ${selected.label}`}
      className={TRIGGER_CLASS}
    >
      <span className="-mr-0.5 font-normal text-foreground/70">정렬:</span>
      {selected.label}
      <ChevronDownIcon
        aria-hidden
        className="size-4.5 text-foreground/70 transition-transform duration-200 group-data-popup-open:rotate-180"
      />
    </Button>
  );

  const props = {
    options: MODE_SORT_OPTIONS,
    selectedKey,
    onSelectKey: select,
    trigger,
  };

  return (
    <>
      <div className="md:hidden">
        <SortKeySheet {...props} />
      </div>
      <div className="hidden md:block">
        <SortKeySelect {...props} />
      </div>
    </>
  );
}
