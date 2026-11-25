'use client';

import { useId, type ReactNode } from 'react';

import { cn } from '@/_shared/lib/cn';
import { Checkbox } from '@/_shared/ui/checkbox';
import { Label } from '@/_shared/ui/label';

// 이전 체크박스 줄 선택지 (OPTION_STYLE 'checkbox' 비교용). 선택지 모양을 확정하면 지운다

interface FilterCheckboxItemProps {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: () => void;
  className?: string;
  // 이름(과 아이콘). 줄 전체가 라벨이라 어디를 눌러도 체크된다
  children: ReactNode;
}

// 줄 높이 48px (터치). 호버하면 줄 전체에 옅은 배경 (after). 비활성이면 줄 전체를 흐리게, 호버 배경도 없앤다
export default function FilterCheckboxItem({
  checked,
  disabled,
  onCheckedChange,
  className,
  children,
}: FilterCheckboxItemProps) {
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
