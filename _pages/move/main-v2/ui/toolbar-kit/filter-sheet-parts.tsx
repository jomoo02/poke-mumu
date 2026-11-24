'use client';

import { useId, useRef, type ComponentProps, type ReactNode } from 'react';

import { cn } from '@/_shared/lib/cn';
import { Checkbox } from '@/_shared/ui/checkbox';
import { Label } from '@/_shared/ui/label';
import { SheetFooter, SheetFooterButton } from '@/_shared/ui/sheet';

// 목록 스크롤 영역 (머리글·아래 버튼은 고정)
export function FilterSheetBody({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'min-h-0 flex-1 overflow-y-auto no-scrollbar px-6',
        className,
      )}
      {...props}
    />
  );
}

interface FilterSheetCheckboxItemProps {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: () => void;
  className?: string;
  // 이름(과 아이콘). 줄 전체가 라벨이라 어디를 눌러도 체크된다
  children: ReactNode;
}

// 줄 높이 48px (터치). 호버하면 줄 전체에 옅은 배경 (after). 비활성이면 줄 전체를 흐리게, 호버 배경도 없앤다
export function FilterSheetCheckboxItem({
  checked,
  disabled,
  onCheckedChange,
  className,
  children,
}: FilterSheetCheckboxItemProps) {
  const id = useId();

  return (
    <Label
      htmlFor={id}
      className={cn(
        'relative isolate flex h-12 min-w-0 cursor-pointer items-center gap-2.5 text-md -mx-3 px-3',
        'after:absolute after:inset-0 after:-z-10 after:rounded-lg hover:after:bg-accent',
        'has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-disabled:hover:after:bg-transparent',
        className,
      )}
    >
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
      {children}
    </Label>
  );
}

interface FilterSheetResetFooterProps {
  // 지울 게 없으면 막는다
  canReset: boolean;
  onReset: () => void;
  // 닫기 버튼 문구 ('120개 보기'). 고르는 즉시 반영되므로 이 버튼은 닫기만 한다
  resultLabel: string;
  // 닫기 (시트·드로어 어느 쪽이든 쓰는 쪽이 open을 내린다)
  onDone: () => void;
}

// 시트 아래: [초기화][N개 보기]. 초기화하면 버튼이 막히므로 포커스를 '보기'로 옮긴다
export function FilterSheetResetFooter({
  canReset,
  onReset,
  resultLabel,
  onDone,
}: FilterSheetResetFooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    // 모바일 드로어는 바닥에 붙으므로 아래 여백에 홈 표시줄 영역을 더한다 (데스크탑은 0)
    <SheetFooter
      ref={footerRef}
      className="flex flex-row pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
    >
      <SheetFooterButton
        variant="input"
        disabled={!canReset}
        onClick={() => {
          onReset();
          footerRef.current
            ?.querySelector<HTMLButtonElement>('[data-filter-done]')
            ?.focus();
        }}
        className="cursor-pointer px-6"
      >
        초기화
      </SheetFooterButton>
      <SheetFooterButton
        data-filter-done
        onClick={onDone}
        className="flex-1 cursor-pointer"
      >
        {resultLabel}
      </SheetFooterButton>
    </SheetFooter>
  );
}
