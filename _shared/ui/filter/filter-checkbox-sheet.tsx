'use client';

import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import { FilterCheckboxList } from './filter-checkbox-list';
import type { FilterCheckboxGroup } from './filter-group';
import { FilterTrigger } from './filter-trigger';

interface FilterCheckboxSheetProps {
  group: FilterCheckboxGroup;
  // 닫기 버튼 문구. 결과 수를 보여준다 (예: '120마리 보기')
  resultLabel: string;
  // false면 아래 줄에 이 그룹 초기화 없이 결과 버튼만. 페이지에 전체 초기화만 둘 때
  showReset?: boolean;
  className?: string;
}

// md 미만: 그룹 하나의 바텀시트. 머리글 오른쪽엔 닫기(X)가 있어 초기화는 아래 줄에 둔다 (FilterSheet와 같은 배치).
// 고르는 즉시 반영되므로 아래 버튼은 결과 수를 보여주며 닫기만 한다
export function FilterCheckboxSheet({
  group,
  resultLabel,
  showReset = true,
  className,
}: FilterCheckboxSheetProps) {
  const [open, setOpen] = useState(false);

  // md 이상에선 트리거를 숨기고(메뉴가 대신한다), 그 폭이 되면 닫는다.
  // 경계 두 곳(트리거 md:hidden · media query)은 이 파일에서 함께 바꾼다
  useCloseOutsideMedia('(max-width: 767px)', open, () => setOpen(false));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <FilterTrigger group={group} className={cn('md:hidden', className)} />
        }
      />
      <SheetContent side="bottom" className="max-h-[90dvh] gap-0">
        <SheetHeader>
          <SheetTitle>{group.title}</SheetTitle>
          {/* 최대 선택 수는 제목 옆이 아닌 설명 줄로 (시트는 머리글이 넓다) */}
          {group.max !== undefined && (
            <SheetDescription>
              최대 {group.max}개까지 선택 가능
            </SheetDescription>
          )}
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6">
          <FilterCheckboxList group={group} place="sheet" />
        </div>
        <SheetFooter className="flex flex-row">
          {showReset && (
            <SheetFooterButton
              variant="input"
              onClick={group.onReset}
              disabled={group.selected.length === 0}
              className="flex-1/3"
            >
              초기화
            </SheetFooterButton>
          )}
          <SheetClose render={<SheetFooterButton className="flex-2/3" />}>
            {resultLabel}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
