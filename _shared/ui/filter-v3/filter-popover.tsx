'use client';

import {
  useId,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from 'react';

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';
import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import { Checkbox } from '@/_shared/ui/checkbox';
import {
  ControlRadioGroupLabel,
  ControlResetButton,
  ControlTriggerButton,
} from '@/_shared/ui/control';

/**
 * md 이상의 필터 팝오버 조각. 모양·규칙만 갖고, 무엇을 보일지는 쓰는 쪽이 조립한다.
 *   <FilterPopover>
 *     <FilterPopoverTrigger active={…} aria-label={…}>불꽃, 물 +1</FilterPopoverTrigger>
 *     <FilterPopoverContent>
 *       <FilterPopoverHeader>타입</FilterPopoverHeader>
 *       <FilterPopoverList aria-label="타입">
 *         <FilterPopoverItem checked … >불꽃</FilterPopoverItem>
 *       </FilterPopoverList>
 *       <FilterPopoverSeparator />
 *       <FilterPopoverFooter>
 *         <FilterPopoverReset canReset={…} onReset={…} />
 *       </FilterPopoverFooter>
 *     </FilterPopoverContent>
 *   </FilterPopover>
 * 규칙 (이 파일에서 함께 바꾼다):
 * - md 미만에선 트리거를 숨기고(시트가 대신한다) 그 폭이 되면 닫는다.
 *   경계 세 곳: 트리거 hidden md:inline-flex · 팝업 max-md:hidden · media query
 * - modal: 열려 있는 동안 페이지 스크롤을 잠그고 바깥 조작을 막는다 (바깥을 누르면 닫히기만 한다)
 * - 고르는 즉시 반영하고 열어 둔다. 닫기 버튼은 없다 (바깥을 누르거나 Esc)
 * - 팝업은 role="dialog": 접근 이름을 FilterPopoverContent의 aria-label로 준다 (예: '타입')
 */
export function FilterPopover({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia('(min-width: 768px)', open, () => setOpen(false));

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      {children}
    </Popover>
  );
}

interface FilterPopoverTriggerProps extends ComponentProps<'button'> {
  // 고른 게 있으면 강조 모양
  active?: boolean;
}

// data-filter-trigger: 초기화 뒤 포커스를 돌려줄 대상 (focusVisibleFilterTrigger)
export function FilterPopoverTrigger({
  active = false,
  className,
  children,
  ...props
}: FilterPopoverTriggerProps) {
  return (
    <PopoverTrigger
      render={
        <ControlTriggerButton
          data-filter-trigger
          variant={active ? 'active' : 'default'}
          className={cn(
            'hidden h-10 max-w-60 md:inline-flex cursor-pointer',
            className,
          )}
          {...props}
        />
      }
    >
      {children}
    </PopoverTrigger>
  );
}

// 목록(스크롤) · 구분선 · 아래 줄을 담는다. 안쪽 여백은 팝업이 p-2로 두고, 목록만 스크롤된다 (아래 줄은 고정)
export function FilterPopoverContent({
  className,
  ...props
}: ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      className={cn(
        'max-h-[min(28rem,var(--available-height))] w-60 gap-0 p-2 max-md:hidden',
        className,
      )}
      {...props}
    />
  );
}

// 그룹 이름 (팝오버의 접근 이름도 된다)
export function FilterPopoverHeader({
  className,
  children,
  ...props
}: ComponentProps<typeof PopoverHeader>) {
  return (
    <PopoverHeader
      className={cn('shrink-0 px-4 pt-4 pb-2', className)}
      {...props}
    >
      <PopoverTitle>{children}</PopoverTitle>
    </PopoverHeader>
  );
}

// 체크박스 묶음 + 스크롤 영역. 한 줄에 하나 (팝오버 폭이 좁다)
export function FilterPopoverList({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      role="group"
      className={cn(
        'flex flex-col overflow-y-auto no-scrollbar relative max-h-72',
        className,
      )}
      {...props}
    />
  );
}

interface FilterPopoverItemProps {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: () => void;
  className?: string;
  // 이름(과 아이콘). 줄 전체가 라벨이라 어디를 눌러도 체크된다
  children: ReactNode;
}

// 줄 높이 40px (마우스). 비활성이면 줄 전체를 흐리게, 호버 배경도 없앤다 (시트 항목과 같은 규칙)
export function FilterPopoverItem({
  checked,
  disabled,
  onCheckedChange,
  className,
  children,
}: FilterPopoverItemProps) {
  const id = useId();

  return (
    <ControlRadioGroupLabel
      htmlFor={id}
      className={cn(
        'h-10 min-w-0 shrink-0',
        'has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-disabled:hover:after:bg-transparent',
        'pl-2.5 pr-3',
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

// 아래 줄 (초기화). 목록과는 FilterPopoverSeparator로 나눈다
export function FilterPopoverFooter({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex shrink-0 items-center px-2 py-0.5', className)}
      {...props}
    />
  );
}

// 목록과 아래 줄 사이 구분선 (메뉴의 구분선과 같은 모양, 팝오버 안에서만 쓴다)
export function FilterPopoverSeparator({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('-mx-1.5 my-1.5 h-px shrink-0 bg-border/50', className)}
      {...props}
    />
  );
}

interface FilterPopoverResetProps extends Omit<
  ComponentProps<typeof ControlResetButton>,
  'onClick'
> {
  // 지울 게 없으면 막는다
  canReset: boolean;
  onReset: () => void;
}

/**
 * [↻ 초기화]: 이 팝오버의 그룹만 지운다. 팝오버는 열어 둔다 (지운 결과를 바로 본다).
 * 누르면 버튼이 막혀 포커스를 잃으므로 목록의 첫 항목으로 옮긴다 (Esc·Tab이 팝오버 안에서 이어지게)
 */
export function FilterPopoverReset({
  canReset,
  onReset,
  className,
  ...props
}: FilterPopoverResetProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const popup = event.currentTarget.closest('[data-slot="popover-content"]');

    onReset();

    popup
      ?.querySelector<HTMLElement>('[role="group"] [role="checkbox"]')
      ?.focus();
  };

  return (
    <ControlResetButton
      disabled={!canReset}
      onClick={handleClick}
      className={cn('cursor-pointer', className)}
      {...props}
    />
  );
}
