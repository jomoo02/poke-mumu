'use client';

import { useState, type ComponentProps, type ReactNode } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import { ControlTriggerButton } from '@/_shared/ui/control';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/_shared/ui/dropdown-menu';

/**
 * md 이상의 필터 메뉴 조각. 모양·규칙만 갖고, 무엇을 보일지는 쓰는 쪽이 조립한다.
 *   <FilterMenu>
 *     <FilterMenuTrigger active={…} aria-label={…}>타입: 불꽃·물</FilterMenuTrigger>
 *     <FilterMenuContent aria-label="타입">
 *       <FilterMenuCheckboxItem label="불꽃" checked … />
 *     </FilterMenuContent>
 *   </FilterMenu>
 * 규칙 (이 파일에서 함께 바꾼다):
 * - md 미만에선 트리거를 숨기고(시트가 대신한다) 그 폭이 되면 닫는다.
 *   경계 세 곳: 트리거 hidden md:inline-flex · 팝업 max-md:hidden · media query
 * - modal={false}: 스크롤을 잠그지 않는다 (연 채로 결과를 보며 스크롤, 스크롤바가 사라지지 않음)
 * - 고르는 즉시 반영하고 열어 둔다 (CheckboxItem 기본)
 */
export function FilterMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia('(min-width: 768px)', open, () => setOpen(false));

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      {children}
    </DropdownMenu>
  );
}

interface FilterMenuTriggerProps extends ComponentProps<'button'> {
  // 고른 게 있으면 강조 모양
  active?: boolean;
}

// data-filter-trigger: 초기화 뒤 포커스를 돌려줄 대상 (focusVisibleFilterTrigger)
export function FilterMenuTrigger({
  active = false,
  className,
  children,
  ...props
}: FilterMenuTriggerProps) {
  return (
    <DropdownMenuTrigger
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
    </DropdownMenuTrigger>
  );
}

export function FilterMenuContent({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      className={cn('max-h-84 w-58 max-md:hidden', className)}
      {...props}
    />
  );
}

// 왼쪽 네모 체크박스 (여러 개를 고른다는 표시). label: 글자 입력으로 찾기에 쓰는 이름 (아이콘이 섞여도)
export function FilterMenuCheckboxItem({
  className,
  ...props
}: Omit<ComponentProps<typeof DropdownMenuCheckboxItem>, 'indicator'>) {
  return (
    <DropdownMenuCheckboxItem
      indicator="start"
      className={cn('h-10 cursor-pointer rounded-lg text-md', className)}
      {...props}
    />
  );
}
