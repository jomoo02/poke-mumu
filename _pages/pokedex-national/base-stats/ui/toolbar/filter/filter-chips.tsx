import { useEffect, useRef, useState } from 'react';
import { XIcon } from 'lucide-react';

import { Button } from '@/_shared/ui/button';
import { focusVisibleFilterTrigger } from '@/_shared/ui/filter';

import { useFilterParam } from '../../../model/filter';

interface FilterChipsProps {
  // 칩을 모두 지운 뒤 포커스를 돌려줄 필터 트리거가 들어 있는 영역 (툴바)
  getFocusRoot: () => HTMLElement | null;
}

/**
 * 검색창 아래: [불꽃 ✕] [비행 ✕] [알로라의 모습 ✕]   ← 고른 값이 있을 때만 (모두 지우기는 시트의 초기화)
 * 칩 하나 = 고른 값 하나 (이름만). 순서는 그룹 순서(타입 → 모습 → 세대) → 고른 순서.
 * 모바일은 한 줄 가로 스크롤, lg 이상은 줄바꿈.
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

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="-mx-1 px-1 py-2 -mb-2 mt-1.5 flex min-w-0 items-center gap-2 overflow-x-auto no-scrollbar lg:flex-wrap lg:overflow-visible">
      {selectedItems.map(({ group, value, label }, index) => (
        <Button
          key={`${group}-${value}`}
          ref={(element) => {
            chipRefs.current[index] = element;
          }}
          size="sm"
          variant="outline"
          aria-label={`${label} 필터 지우기`}
          onClick={() => {
            toggleFilter(group, value);
            setFocusIndex(index);
          }}
          className="cursor-pointer dark:bg-card"
        >
          <span aria-hidden>{label}</span>
          <XIcon aria-hidden className="size-3.5 text-foreground/70" />
        </Button>
      ))}
    </div>
  );
}
