'use client';

import { useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/_shared/ui/dropdown-menu';

import type { FilterCheckboxGroup } from './filter-group';
import { FilterTrigger } from './filter-trigger';

interface FilterCheckboxMenuProps {
  group: FilterCheckboxGroup;
  // 트리거 (예: shrink-0). 화면 구간 숨김은 여기서 한다
  className?: string;
  // 팝업 (예: 폭·높이). 그룹마다 모양을 바꿀 때
  contentClassName?: string;
}

/**
 * md 이상: [타입 ⌄] → 체크박스 메뉴. 1열 목록, 많으면 스크롤.
 * - 고르는 즉시 반영하고 열어 둔다 (여러 개를 고른다)
 * - 방향키 이동·글자 입력으로 찾기 (메뉴 기본)
 * - modal={false}: 스크롤을 잠그지 않는다. 연 채로 결과를 보며 스크롤할 수 있고 스크롤바가 사라지지 않는다
 * - md 미만에선 트리거를 숨기고(시트가 대신한다), 그 폭이 되면 닫는다. 팝업도 같은 경계에서 숨겨 왼쪽 위로 튀지 않게 한다.
 *   경계 세 곳(트리거 hidden md:inline-flex · 팝업 max-md:hidden · media query)은 이 파일에서 함께 바꾼다
 */
export function FilterCheckboxMenu({
  group,
  className,
  contentClassName,
}: FilterCheckboxMenuProps) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia('(min-width: 768px)', open, () => setOpen(false));

  const selected = new Set(group.selected);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger
        render={
          <FilterTrigger
            group={group}
            className={cn('hidden md:inline-flex', className)}
          />
        }
      />
      <DropdownMenuContent
        aria-label={group.title}
        className={cn(
          'max-h-84 max-md:hidden',
          group.options.length > 6 ? 'w-60' : 'w-58',
          contentClassName,
        )}
      >
        {group.options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            indicator="start"
            checked={selected.has(option.value)}
            disabled={group.isDisabled?.(option.value)}
            onCheckedChange={() => group.onToggle(option.value)}
            // 글자 입력으로 찾기: 아이콘이 섞여도 이름으로 찾는다
            label={option.label}
            className="h-10 cursor-pointer rounded-lg text-md"
          >
            {option.icon}
            <span className="min-w-0 truncate">{option.label}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
