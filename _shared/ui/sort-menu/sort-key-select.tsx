'use client';

import type { ReactElement } from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';

import { Select, SelectContent, SelectItem } from '@/_shared/ui/select';

import type { SortMenuOption } from './sort-menu-option';

interface SortKeySelectProps<K extends string> {
  options: readonly SortMenuOption<K>[];
  selectedKey: K;
  onSelectKey: (key: K) => void;
  trigger: ReactElement;
}

// md 이상 기준 선택: 셀렉트. 열면 지금 기준에서 시작하고, 고르면 닫히며 포커스는 트리거로 돌아간다
export function SortKeySelect<K extends string>({
  options,
  selectedKey,
  onSelectKey,
  trigger,
}: SortKeySelectProps<K>) {
  // 값은 unknown으로 다루고 알려진 기준일 때만 넘긴다
  const handleValueChange = (value: unknown) => {
    const option = options.find((candidate) => candidate.key === value);
    if (option) onSelectKey(option.key);
  };

  return (
    // modal(기본값): 열려 있는 동안 페이지 스크롤을 잠근다.
    // 스크롤바 자리는 <html>의 scrollbar-gutter: stable이 지켜 화면이 좌우로 움직이지 않는다
    <Select value={selectedKey} onValueChange={handleValueChange}>
      {/* 트리거는 버튼 덩어리의 왼쪽 칸 그대로 (셰브론 포함) */}
      <SelectPrimitive.Trigger render={trigger} />
      <SelectContent aria-label="정렬 기준" className="w-44">
        {options.map((option) => (
          // 고르면 주소(URL)가 바뀌므로 링크처럼 손가락 커서
          <SelectItem
            key={option.key}
            value={option.key}
            className="cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
