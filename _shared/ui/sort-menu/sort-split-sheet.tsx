'use client';

import { useId, useState, type ReactElement } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import { ScrollFadeArea } from '@/_shared/ui/scroll-fade-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import { SortChoiceButton } from './sort-choice-button';
import type { SortDirection, SortMenuOption } from './sort-menu-option';

// 표 머리글과 같은 화살표: 오름차순 ↑, 내림차순 ↓
const DIRECTION_OPTIONS = [
  { value: 'asc', label: '오름차순', Icon: ArrowUpIcon },
  { value: 'desc', label: '내림차순', Icon: ArrowDownIcon },
] as const;

interface SortSplitSheetProps<K extends string> {
  // 정렬 기준 (테이블 머리글과 같은 항목)
  options: readonly SortMenuOption<K>[];
  selectedKey: K;
  // 기준을 고를 때. 방향은 쓰는 쪽이 그 기준의 첫 방향으로 정한다
  onSelectKey: (key: K) => void;
  direction: SortDirection;
  onSelectDirection: (direction: SortDirection) => void;
  trigger: ReactElement;
}

/**
 * 분리형 정렬 시트: 위 [정렬 기준] 2열, 아래 [정렬 방향] 2열. 어느 칸을 눌러도 반영하고 닫는다.
 * 기준을 먼저 두어, 기준을 고를 때 정해지는 첫 방향(이름 오름차순, 수치 내림차순)을
 * 필요할 때만 아래에서 바꾸게 한다 (방향을 먼저 고르면 기준을 고를 때 덮어써진다)
 */
export function SortSplitSheet<K extends string>({
  options,
  selectedKey,
  onSelectKey,
  direction,
  onSelectDirection,
  trigger,
}: SortSplitSheetProps<K>) {
  const [open, setOpen] = useState(false);

  const idPrefix = useId();
  const keyTitleId = `${idPrefix}-key`;
  const directionTitleId = `${idPrefix}-direction`;

  // 이미 고른 칸을 다시 눌러도 닫는다
  const selectKey = (key: K) => {
    if (key !== selectedKey) {
      onSelectKey(key);
    }
    setOpen(false);
  };

  const selectDirection = (next: SortDirection) => {
    if (next !== direction) {
      onSelectDirection(next);
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
          <div className="flex flex-col gap-y-5">
            <section className="flex flex-col gap-y-2">
              <h3
                id={keyTitleId}
                className="text-sm font-medium text-foreground/70"
              >
                정렬 기준
              </h3>
              <div
                role="group"
                aria-labelledby={keyTitleId}
                className="grid grid-cols-2 gap-2"
              >
                {options.map((option) => (
                  <SortChoiceButton
                    key={option.key}
                    active={option.key === selectedKey}
                    onClick={() => selectKey(option.key)}
                  >
                    {option.label}
                  </SortChoiceButton>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-y-2">
              <h3
                id={directionTitleId}
                className="text-sm font-medium text-foreground/70"
              >
                정렬 방향
              </h3>
              <div
                role="group"
                aria-labelledby={directionTitleId}
                className="grid grid-cols-2 gap-2"
              >
                {DIRECTION_OPTIONS.map(({ value, label, Icon }) => (
                  <SortChoiceButton
                    key={value}
                    active={value === direction}
                    onClick={() => selectDirection(value)}
                  >
                    <Icon aria-hidden className="size-4" />
                    {label}
                  </SortChoiceButton>
                ))}
              </div>
            </section>
          </div>
        </ScrollFadeArea>
      </SheetContent>
    </Sheet>
  );
}
