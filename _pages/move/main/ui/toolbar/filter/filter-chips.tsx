import { useEffect, useRef, useState } from 'react';
import { XIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { useFilterParam } from '../../../model/filter';

interface FilterChipsProps {
  // 칩을 모두 지운 뒤 (칩 줄이 사라져) 포커스를 옮길 곳
  onEmptied: () => void;
}

/**
 * 필터 시트 맨 위: [불꽃 ✕] [물 ✕] [물리 ✕]  모두 지우기   ← 고른 값이 있을 때만
 * 칩 하나 = 고른 값 하나 (이름만). 순서는 그룹 순서(타입 → 분류) → 고른 순서. 넘치면 줄바꿈.
 * 칩을 지우면 그 자리의 다음 칩(없으면 앞 칩)으로, 모두 지우면 onEmptied로 포커스를 옮긴다
 */
export default function FilterChips({ onEmptied }: FilterChipsProps) {
  const { selectedItems, toggleFilter, resetFilters } = useFilterParam();

  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 지운 칩의 자리. 다음 렌더(칩이 하나 줄어든 뒤)에 포커스를 옮긴다
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  useEffect(() => {
    if (focusIndex === null) {
      return;
    }

    setFocusIndex(null);

    if (selectedItems.length === 0) {
      onEmptied();

      return;
    }

    chipRefs.current[Math.min(focusIndex, selectedItems.length - 1)]?.focus();
  }, [focusIndex, selectedItems.length, onEmptied]);

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pb-3">
      {selectedItems.map(({ group, value, label }, index) => (
        <Button
          key={`${group}-${value}`}
          ref={(element) => {
            chipRefs.current[index] = element;
          }}
          variant="ghost"
          aria-label={`${label} 필터 지우기`}
          onClick={() => {
            toggleFilter(group, value);
            setFocusIndex(index);
          }}
          className={cn(
            'h-8 shrink-0 cursor-pointer gap-1 rounded-full pl-3 pr-2 text-sm',
            'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
          )}
        >
          <span aria-hidden>{label}</span>
          <XIcon aria-hidden className="size-3.5 text-foreground/70" />
        </Button>
      ))}
      <Button
        variant="ghost"
        onClick={() => {
          resetFilters();
          setFocusIndex(0);
        }}
        className="h-8 shrink-0 cursor-pointer px-2 text-sm text-foreground/70 hover:bg-transparent hover:text-foreground dark:hover:bg-transparent"
      >
        모두 지우기
      </Button>
    </div>
  );
}
