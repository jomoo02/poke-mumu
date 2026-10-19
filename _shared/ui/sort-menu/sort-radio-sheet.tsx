'use client';

import { useId, useState, type ReactElement } from 'react';
import { ArrowDownIcon, ArrowUpIcon, type LucideIcon } from 'lucide-react';

import { ControlRadioGroupLabel } from '@/_shared/ui/control';
import { RadioGroup, RadioGroupItem } from '@/_shared/ui/radio-group';
import { ScrollFadeArea } from '@/_shared/ui/scroll-fade-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import type { SortMenuOption } from './sort-menu-option';

type SortDirection = 'asc' | 'desc';

// 표 머리글과 같은 화살표: 오름차순 ↑, 내림차순 ↓
const DIRECTION_OPTIONS = [
  { value: 'asc', label: '오름차순', Icon: ArrowUpIcon },
  { value: 'desc', label: '내림차순', Icon: ArrowDownIcon },
] as const satisfies readonly {
  value: SortDirection;
  label: string;
  Icon: LucideIcon;
}[];

const isSortDirection = (value: unknown): value is SortDirection =>
  DIRECTION_OPTIONS.some((option) => option.value === value);

interface SortRadioSheetProps<K extends string> {
  // 정렬 기준 (테이블 머리글과 같은 항목)
  options: readonly SortMenuOption<K>[];
  selectedKey: K;
  // 기준을 고를 때. 방향은 쓰는 쪽이 정한다 (보통 그 기준의 첫 방향)
  onSelectKey: (key: K) => void;
  direction: SortDirection;
  onSelectDirection: (direction: SortDirection) => void;
  trigger: ReactElement;
}

/**
 * 좁은 화면 정렬: 바텀시트에 [정렬 방향] [정렬 기준] 두 radio-group (각 2열).
 * 방향이든 기준이든 하나를 고르면 바로 반영하고 시트를 닫는다 (닫기 버튼 없음, 위 X·바깥 누름으로도 닫힌다).
 * radio라 화살표 키로 옮기기만 해도 선택(= 반영)되어 그 자리에서 닫힌다
 */
export function SortRadioSheet<K extends string>({
  options,
  selectedKey,
  onSelectKey,
  direction,
  onSelectDirection,
  trigger,
}: SortRadioSheetProps<K>) {
  const [open, setOpen] = useState(false);

  // 이미 선택된 항목을 누르면 radio 값이 바뀌지 않아(onValueChange 없음) 클릭으로도 닫는다.
  // 라벨·radio 어느 쪽을 눌러도(Space 포함) 클릭이 라벨까지 올라온다
  const close = () => setOpen(false);

  const idPrefix = useId();
  const directionTitleId = `${idPrefix}-direction`;
  const keyTitleId = `${idPrefix}-key`;

  // 값은 unknown으로 다루고 알려진 값일 때만 넘긴다
  const handleDirectionChange = (value: unknown) => {
    if (!isSortDirection(value)) {
      return;
    }
    if (value !== direction) {
      onSelectDirection(value);
    }
    close();
  };

  const handleKeyChange = (value: unknown) => {
    const option = options.find((candidate) => candidate.key === value);
    if (!option) {
      return;
    }
    if (option.key !== selectedKey) {
      onSelectKey(option.key);
    }
    close();
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
        {/* pt-1: radio 포커스 링·호버 배경이 스크롤 영역에 잘리지 않게.
            pb: 푸터가 없어 헤더(p-6)와 같은 아래 여백 + 홈 인디케이터 영역 */}
        <ScrollFadeArea className="-mt-1 px-6 pt-1 pb-[calc(--spacing(6)+env(safe-area-inset-bottom))]">
          <div className="flex flex-col gap-y-5">
            <section className="flex flex-col gap-y-1.5">
              <h3
                id={directionTitleId}
                className="text-sm font-medium text-foreground/70"
              >
                정렬 방향
              </h3>
              <RadioGroup
                aria-labelledby={directionTitleId}
                value={direction}
                onValueChange={handleDirectionChange}
                className="grid-cols-2 gap-x-4 gap-y-1"
              >
                {DIRECTION_OPTIONS.map(({ value, label, Icon }) => {
                  const id = `${idPrefix}-direction-${value}`;

                  return (
                    <ControlRadioGroupLabel
                      key={value}
                      htmlFor={id}
                      onClick={close}
                    >
                      <RadioGroupItem id={id} value={value} />
                      <Icon aria-hidden className="size-4" />
                      {label}
                    </ControlRadioGroupLabel>
                  );
                })}
              </RadioGroup>
            </section>

            <section className="flex flex-col gap-y-1.5">
              <h3
                id={keyTitleId}
                className="text-sm font-medium text-foreground/70"
              >
                정렬 기준
              </h3>
              <RadioGroup
                aria-labelledby={keyTitleId}
                value={selectedKey}
                onValueChange={handleKeyChange}
                className="grid-cols-2 gap-x-4 gap-y-1"
              >
                {options.map((option) => {
                  const id = `${idPrefix}-key-${option.key}`;

                  return (
                    <ControlRadioGroupLabel
                      key={option.key}
                      htmlFor={id}
                      onClick={close}
                    >
                      <RadioGroupItem id={id} value={option.key} />
                      {option.label}
                    </ControlRadioGroupLabel>
                  );
                })}
              </RadioGroup>
            </section>
          </div>
        </ScrollFadeArea>
      </SheetContent>
    </Sheet>
  );
}
