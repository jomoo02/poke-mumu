'use client';

import { useState, type ReactElement } from 'react';

import { cn } from '@/_shared/lib/cn';
import { ScrollFadeArea } from '@/_shared/ui/scroll-fade-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import type { SortDirection, SortMatrixOption } from './sort-menu-option';

interface SortMatrixSheetProps<K extends string> {
  options: readonly SortMatrixOption<K>[];
  selectedKey: K;
  direction: SortDirection;
  // 기준과 방향을 한 번에 정한다
  onSelect: (key: K, direction: SortDirection) => void;
  trigger: ReactElement;
}

// 세그먼트 칸. 선택된 칸만 틀 위로 띄우고(배경 + 그림자), 나머지는 글자만 옅게
const SEGMENT_CLASS = cn(
  'h-8 min-w-0 cursor-pointer truncate rounded-full px-2 text-sm font-medium outline-none',
  'focus-visible:ring-3 focus-visible:ring-ring/50',
);

const SEGMENT_STATE_CLASS = {
  active: 'bg-background font-semibold text-foreground shadow-sm',
  idle: 'text-foreground/70 [@media(hover:hover)]:hover:text-foreground',
} as const;

/**
 * 표형 정렬 시트: 기준마다 한 줄 [기준 이름 ··· (첫 방향 | 반대 방향)].
 * 오른쪽은 세그먼트 컨트롤 모양이라 칸이 덩어리로 보이지 않고, 지금 정렬만 틀 위로 떠 보인다.
 * 칸 하나가 곧 결과('공격 높은 순')라 한 번 누르면 반영하고 닫는다.
 * 왼쪽 칸이 그 기준에서 흔히 쓰는 방향(번호·이름 오름차순, 수치 내림차순)
 */
export function SortMatrixSheet<K extends string>({
  options,
  selectedKey,
  direction,
  onSelect,
  trigger,
}: SortMatrixSheetProps<K>) {
  const [open, setOpen] = useState(false);

  // 이미 고른 칸을 다시 눌러도 닫는다
  const select = (key: K, next: SortDirection) => {
    if (key !== selectedKey || next !== direction) {
      onSelect(key, next);
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={trigger} />
      <SheetContent
        side="bottom"
        className="max-h-[85dvh] gap-0 **:data-[slot=sheet-close]:cursor-pointer"
      >
        <SheetHeader>
          <SheetTitle>정렬</SheetTitle>
        </SheetHeader>
        {/* pt-1: 칸 포커스 링이 스크롤 영역에 잘리지 않게. pb: 헤더(p-6)와 같은 아래 여백 + 홈 인디케이터 영역 */}
        <ScrollFadeArea className="-mt-1 px-6 pt-1 pb-[calc(--spacing(6)+env(safe-area-inset-bottom))]">
          {/* role=list: Safari VoiceOver는 list-style 없는 ul을 목록으로 안 읽는다 */}
          <ul role="list" aria-label="정렬" className="flex flex-col">
            {options.map((option) => {
              const isSelectedRow = option.key === selectedKey;

              return (
                <li
                  key={option.key}
                  className="flex h-12 items-center justify-between gap-4"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'truncate text-md',
                      isSelectedRow ? 'font-semibold' : 'font-normal',
                    )}
                  >
                    {option.label}
                  </span>
                  <div className="grid w-44 shrink-0 grid-cols-2 rounded-full bg-muted p-1">
                    {option.directions.map((choice) => {
                      const active =
                        isSelectedRow && choice.direction === direction;

                      return (
                        <button
                          key={choice.direction}
                          type="button"
                          aria-current={active ? 'true' : undefined}
                          // 칸 글자('높은 순')엔 기준이 없어 전체 이름('공격 높은 순')을 접근 이름으로
                          aria-label={choice.sortLabel}
                          onClick={() => select(option.key, choice.direction)}
                          className={cn(
                            SEGMENT_CLASS,
                            SEGMENT_STATE_CLASS[active ? 'active' : 'idle'],
                          )}
                        >
                          {choice.label}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollFadeArea>
      </SheetContent>
    </Sheet>
  );
}
