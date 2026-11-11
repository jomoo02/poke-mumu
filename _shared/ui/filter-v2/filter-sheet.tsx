'use client';

import { useId, useState, type ComponentProps, type ReactNode } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import { Checkbox } from '@/_shared/ui/checkbox';
import {
  ControlRadioGroupLabel,
  ControlTriggerButton,
} from '@/_shared/ui/control';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetFooterButton,
  SheetTrigger,
} from '@/_shared/ui/sheet';

/**
 * md 미만의 필터 바텀시트 조각. 모양·규칙만 갖고, 무엇을 보일지는 쓰는 쪽이 조립한다.
 *   <FilterSheet>
 *     <FilterSheetTrigger active={…} aria-label={…}>타입: 불꽃·물</FilterSheetTrigger>
 *     <FilterSheetContent>
 *       <SheetHeader>…</SheetHeader>          ← '@/_shared/ui/sheet' 그대로
 *       <FilterSheetBody>
 *         <FilterSheetCheckboxGroup aria-label="타입" className="grid-cols-2">
 *           <FilterSheetCheckboxItem checked … >불꽃</FilterSheetCheckboxItem>
 *         </FilterSheetCheckboxGroup>
 *       </FilterSheetBody>
 *       <FilterSheetFooter><FilterSheetDone>120마리 보기</FilterSheetDone></FilterSheetFooter>
 *     </FilterSheetContent>
 *   </FilterSheet>
 * 규칙 (이 파일에서 함께 바꾼다): md 이상에선 트리거를 숨기고(메뉴가 대신한다) 그 폭이 되면 닫는다.
 * 경계 두 곳: 트리거 md:hidden · media query
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
        <ControlTriggerButton
          data-filter-trigger
          variant={active ? 'active' : 'default'}
          className={cn('h-10 max-w-60 md:hidden cursor-pointer', className)}
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

// 줄 높이 44px (터치 목표). 비활성이면 줄 전체를 흐리게, 호버 배경도 없앤다
export function FilterSheetCheckboxItem({
  checked,
  disabled,
  onCheckedChange,
  className,
  children,
}: FilterSheetCheckboxItemProps) {
  const id = useId();

  return (
    <ControlRadioGroupLabel
      htmlFor={id}
      className={cn(
        'h-12 min-w-0',
        'has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-disabled:hover:after:bg-transparent active:after:bg-accent',
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
    </ControlRadioGroupLabel>
  );
}

export function FilterSheetFooter({
  className,
  ...props
}: ComponentProps<typeof SheetFooter>) {
  return <SheetFooter className={cn('flex flex-row', className)} {...props} />;
}

// 고르는 즉시 반영되므로 아래 버튼은 닫기만 한다 (문구는 결과 수: '120마리 보기')
export function FilterSheetDone({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <SheetClose
      render={<SheetFooterButton className={cn('flex-1', className)} />}
    >
      {children}
    </SheetClose>
  );
}
