'use client';

import { useState } from 'react';

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
  className?: string;
}

/**
 * md 이상: [타입 ⌄] → 체크박스 메뉴. 1열 목록, 많으면 스크롤.
 * - 고르는 즉시 반영하고 열어 둔다 (여러 개를 고른다)
 * - 방향키 이동·글자 입력으로 찾기 (메뉴 기본)
 * - modal={false}: 스크롤을 잠그지 않는다. 연 채로 결과를 보며 스크롤할 수 있고 스크롤바가 사라지지 않는다
 * - 트리거가 숨는 폭(md 미만)이 되면 닫는다. 팝업도 같은 경계에서 숨겨 왼쪽 위로 튀지 않게 한다
 *   (경계를 바꾸면 FilterCheckboxControl의 hidden md:inline-flex와 함께 바꾼다)
 */
export function FilterCheckboxMenu({
  group,
  className,
}: FilterCheckboxMenuProps) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia('(min-width: 768px)', open, () => setOpen(false));

  const selected = new Set(group.selected);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger
        render={<FilterTrigger group={group} className={className} />}
      />
      <DropdownMenuContent
        aria-label={group.title}
        className="max-h-80 w-58 py-2 max-md:hidden"
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
            className="h-10 cursor-pointer"
          >
            {option.icon}
            <span className="min-w-0 truncate">{option.label}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
