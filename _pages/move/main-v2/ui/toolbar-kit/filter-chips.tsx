'use client';

import { useEffect, useRef, useState } from 'react';
import { XIcon } from 'lucide-react';

import { Button } from '@/_shared/ui/button';

import { useFilterParam } from '../../model/filter';
import { focusVisibleFilterTrigger } from './focus-filter-trigger';

interface FilterChipsProps {
  // 칩을 모두 지운 뒤 포커스를 돌려줄 필터 트리거가 들어 있는 영역 (툴바)
  getFocusRoot: () => HTMLElement | null;
}

/**
 * 고른 값 칩: [불꽃 ✕][물 ✕] (모두 지우기는 시트의 초기화). 순서는 그룹 순서 → 고른 순서.
 * lg 미만은 한 줄 가로 스크롤, lg 이상은 줄바꿈. 줄 배치는 Toolbar가 잡는다.
 * 칩을 지우면 그 자리의 다음 칩(없으면 앞 칩)으로, 모두 지우면 필터 트리거로 포커스를 옮긴다
 */
export default function FilterChips({ getFocusRoot }: FilterChipsProps) {
  const { selectedItems, toggleFilter } = useFilterParam();

  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 지운 칩의 자리. 다음 렌더(칩이 하나 줄어든 뒤)에 포커스를 옮긴다
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  useEffect(() => {
    if (focusIndex === null) {
      return;
    }

    setFocusIndex(null);

    if (selectedItems.length === 0) {
      const root = getFocusRoot();

      if (root) {
        focusVisibleFilterTrigger(root);
      }

      return;
    }

    chipRefs.current[Math.min(focusIndex, selectedItems.length - 1)]?.focus();
  }, [focusIndex, selectedItems.length, getFocusRoot]);

  return (
    // p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게
    // lg 미만은 자기 줄 (basis-full), lg 이상은 개수 옆 남는 폭 (basis-0 flex-1).
    // 칩이 없으면 숨긴다 (지운 뒤 포커스를 옮겨야 해서 컴포넌트는 남겨 둔다)
    <div className="-m-1 flex min-w-0 basis-full items-center gap-2 overflow-x-auto p-1 no-scrollbar empty:hidden lg:flex-1 lg:basis-0 lg:flex-wrap lg:overflow-visible">
      {selectedItems.map(({ group, value, label }, index) => (
        <Button
          key={`${group}-${value}`}
          ref={(element) => {
            chipRefs.current[index] = element;
          }}
          size="xs"
          variant="outline"
          aria-label={`${label} 필터 지우기`}
          onClick={() => {
            toggleFilter(group, value);
            setFocusIndex(index);
          }}
          className="shrink-0 cursor-pointer dark:bg-card"
        >
          <span aria-hidden>{label}</span>
          <XIcon
            data-icon="inline-end"
            aria-hidden
            className="size-3.5 text-foreground/70"
          />
        </Button>
      ))}
    </div>
  );
}
