'use client';

import { useRef, useState, type ReactElement } from 'react';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { ScrollFadeArea } from '@/_shared/ui/scroll-fade-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import type { SortMenuOption } from './sort-menu-option';

interface SortKeySheetProps<K extends string> {
  options: readonly SortMenuOption<K>[];
  selectedKey: K;
  onSelectKey: (key: K) => void;
  trigger: ReactElement;
}

// md 미만 기준 선택: 바텀시트 + 버튼 목록. 누르면 바로 반영하고 닫는다.
// radio를 쓰지 않는 이유: radio는 화살표로 옮기기만 해도 선택돼, 옮길 때마다 정렬·주소가 바뀐다.
// 버튼은 Tab으로 옮기고 누를 때(클릭·Enter)만 바꾼다. 목록(ul/li)이라 '5개 중 2번째'는 그대로 읽힌다
export function SortKeySheet<K extends string>({
  options,
  selectedKey,
  onSelectKey,
  trigger,
}: SortKeySheetProps<K>) {
  const [open, setOpen] = useState(false);
  // 열 때 선택된 줄로 포커스(= 스크롤)해 긴 목록에서도 지금 기준이 보이게
  const selectedRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (key: K) => {
    onSelectKey(key);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={trigger} />
      <SheetContent
        side="bottom"
        initialFocus={selectedRef}
        // 위 X·아래 닫기 버튼(둘 다 data-slot=sheet-close)도 정렬 칸과 같은 손가락 커서
        className="max-h-[85dvh] gap-0 **:data-[slot=sheet-close]:cursor-pointer"
      >
        <SheetHeader>
          <SheetTitle>정렬</SheetTitle>
        </SheetHeader>
        <ScrollFadeArea className="px-6 -my-1 py-1">
          {/* role=list: Safari VoiceOver는 list-style 없는 ul을 목록으로 안 읽는다 */}
          <ul
            role="list"
            aria-label="정렬 기준"
            className="flex flex-col gap-y-1.5"
          >
            {options.map((option) => {
              const active = option.key === selectedKey;
              return (
                <li key={option.key}>
                  <Button
                    type="button"
                    variant="ghost"
                    ref={active ? selectedRef : undefined}
                    // 지금 기준. 껐다 켜는 버튼이 아니라 aria-pressed 대신 aria-current
                    aria-current={active ? 'true' : undefined}
                    onClick={() => handleSelect(option.key)}
                    className={cn(
                      'relative isolate grid h-10.5 w-full cursor-pointer grid-cols-[1fr_1.25rem] justify-normal gap-x-2.5 rounded-none border-0 px-0 text-left',
                      // 버튼 자체 배경·링은 끄고, 전체 줄 호버·포커스 배경은 양옆으로 bleed
                      'hover:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent',
                      'after:absolute after:inset-y-0 after:-inset-x-2.5 after:-z-10 after:rounded-lg',
                      'focus-visible:after:ring-3 focus-visible:after:ring-ring/50',
                      '[@media(hover:hover)]:hover:after:bg-muted',
                    )}
                  >
                    <span
                      className={cn(
                        'text-md leading-6',
                        active
                          ? 'font-semibold text-primary-text'
                          : 'font-medium text-foreground/80',
                      )}
                    >
                      {option.label}
                    </span>
                    <span aria-hidden className="text-primary-text">
                      {active && (
                        <CheckIcon className="size-4.5" strokeWidth={2.5} />
                      )}
                    </span>
                  </Button>
                </li>
              );
            })}
          </ul>
        </ScrollFadeArea>
        <SheetFooter>
          <SheetClose
            render={<SheetFooterButton variant="input" className="w-full" />}
          >
            닫기
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
