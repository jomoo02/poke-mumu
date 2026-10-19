'use client';

import { useId, useRef, useState, type ReactElement } from 'react';
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

import type {
  MoveSortChoice,
  MoveSortChoiceGroup,
} from '../../model/move-sort-option';

interface SortChoiceSheetProps {
  groups: readonly MoveSortChoiceGroup[];
  selectedKey: string;
  onSelect: (choice: MoveSortChoice) => void;
  trigger: ReactElement;
}

// _shared/ui/sort-menu/sort-key-sheet.tsx와 같은 줄 모양 (버튼 목록, 누르면 반영하고 닫기)
const CHOICE_BUTTON_CLASS = cn(
  'relative isolate grid h-11 w-full cursor-pointer grid-cols-[1fr_1.25rem] justify-normal gap-x-2.5 rounded-none border-0 px-0 text-left font-normal text-foreground',
  'hover:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent',
  'after:absolute after:inset-y-0 after:-inset-x-2.5 after:-z-10 after:rounded-lg',
  'focus-visible:after:ring-3 focus-visible:after:ring-ring/50',
  '[@media(hover:hover)]:hover:after:bg-accent [@media(hover:hover)]:hover:text-accent-foreground',
  'focus:font-semibold focus:text-accent-foreground',
);

// md 미만 정렬: 바텀시트에 묶음(순서·수치)마다 제목 + 선택지 목록
export default function SortChoiceSheet({
  groups,
  selectedKey,
  onSelect,
  trigger,
}: SortChoiceSheetProps) {
  const [open, setOpen] = useState(false);
  // 열 때 선택된 줄로 포커스(= 스크롤)해 지금 정렬이 보이게
  const selectedRef = useRef<HTMLButtonElement>(null);

  const idPrefix = useId();

  const handleSelect = (choice: MoveSortChoice) => {
    onSelect(choice);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={trigger} />
      <SheetContent
        side="bottom"
        initialFocus={selectedRef}
        className="max-h-[85dvh] gap-0 **:data-[slot=sheet-close]:cursor-pointer"
      >
        <SheetHeader>
          <SheetTitle>정렬</SheetTitle>
        </SheetHeader>
        <ScrollFadeArea className="-my-1 px-6 py-1">
          <div className="flex flex-col gap-y-4">
            {groups.map((group, index) => {
              const titleId = `${idPrefix}-${index}`;

              return (
                <section key={group.label} className="flex flex-col gap-y-1">
                  <h3
                    id={titleId}
                    className="text-sm font-medium text-foreground/70"
                  >
                    {group.label}
                  </h3>
                  {/* role=list: Safari VoiceOver는 list-style 없는 ul을 목록으로 안 읽는다 */}
                  <ul
                    role="list"
                    aria-labelledby={titleId}
                    className="flex flex-col gap-y-0.5"
                  >
                    {group.choices.map((choice) => {
                      const active = choice.key === selectedKey;

                      return (
                        <li key={choice.key}>
                          <Button
                            type="button"
                            variant="ghost"
                            ref={active ? selectedRef : undefined}
                            aria-current={active ? 'true' : undefined}
                            onClick={() => handleSelect(choice)}
                            className={CHOICE_BUTTON_CLASS}
                          >
                            <span className="text-md leading-6">
                              {choice.label}
                            </span>
                            <span aria-hidden className="text-foreground">
                              {active && (
                                <CheckIcon
                                  className="size-4.5"
                                  strokeWidth={2.5}
                                />
                              )}
                            </span>
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
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
