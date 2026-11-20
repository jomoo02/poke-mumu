'use client';

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import { Checkbox } from '@/_shared/ui/checkbox';
import { Label } from '@/_shared/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetFooterButton,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import { ChipTrigger } from './chip-trigger';

/**
 * md 미만의 필터 바텀시트 조각. 모양·규칙만 갖고, 무엇을 보일지는 쓰는 쪽이 조립한다.
 *   <FilterSheet>
 *     <FilterSheetTrigger active={…} aria-label={…}>불꽃, 물</FilterSheetTrigger>
 *     <FilterSheetContent>
 *       <SheetHeader>…</SheetHeader>          ← '@/_shared/ui/sheet' 그대로
 *       <FilterSheetBody>
 *         <FilterSheetCheckboxGroup aria-label="타입">
 *           <FilterSheetCheckboxItem checked … >불꽃</FilterSheetCheckboxItem>
 *         </FilterSheetCheckboxGroup>
 *       </FilterSheetBody>
 *       <FilterSheetResetFooter canReset={…} onReset={…} resultLabel="120개 보기" />
 *     </FilterSheetContent>
 *   </FilterSheet>
 * 규칙 (이 파일에서 함께 바꾼다): md 이상에선 트리거를 숨기고(팝오버가 대신한다) 그 폭이 되면 닫는다.
 * 경계 두 곳: 트리거 md:hidden · media query
 * (기술 페이지 전용으로 다듬는 중. _shared/ui/filter-v3 시트 + filter-v2 아래 버튼을 옮겨 _shared/ui/control 없이 쓴다)
 */
export function FilterSheet({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia('(max-width: 767px)', open, () => setOpen(false));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {children}
    </Sheet>
  );
}

interface FilterSheetTriggerProps extends ComponentProps<'button'> {
  // 고른 게 있으면 강조 모양
  active?: boolean;
}

// data-filter-trigger: 초기화 뒤 포커스를 돌려줄 대상 (focusVisibleFilterTrigger)
export function FilterSheetTrigger({
  active = false,
  className,
  children,
  ...props
}: FilterSheetTriggerProps) {
  return (
    <SheetTrigger
      render={
        <ChipTrigger
          data-filter-trigger
          active={active}
          className={cn('max-w-60 md:hidden cursor-pointer', className)}
          {...props}
        />
      }
    >
      {children}
    </SheetTrigger>
  );
}

export function FilterSheetContent({
  className,
  ...props
}: ComponentProps<typeof SheetContent>) {
  return (
    <SheetContent
      side="bottom"
      className={cn('max-h-[70dvh] gap-0', className)}
      {...props}
    />
  );
}

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

// 체크박스 묶음. 열 수는 쓰는 쪽이 className으로 (예: grid-cols-2)
export function FilterSheetCheckboxGroup({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div role="group" className={cn('grid gap-x-6', className)} {...props} />
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
        'relative isolate flex h-12 min-w-0 cursor-pointer items-center gap-2.5 text-md',
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
}

// 시트 아래: [초기화][N개 보기]. 초기화하면 버튼이 막히므로 포커스를 '보기'로 옮긴다
export function FilterSheetResetFooter({
  canReset,
  onReset,
  resultLabel,
}: FilterSheetResetFooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <SheetFooter ref={footerRef} className="flex flex-row">
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
      <SheetClose
        render={
          <SheetFooterButton
            data-filter-done
            className="flex-1 cursor-pointer"
          />
        }
      >
        {resultLabel}
      </SheetClose>
    </SheetFooter>
  );
}
