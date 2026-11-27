'use client';

import { useEffect, useRef, useState } from 'react';
import { XIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import {
  SCROLL_FADE_CLASS_NAME,
  useScrollEdges,
} from '../../lib/use-scroll-edges';
import { useFilterParam } from '../../model/filter';
import { focusVisibleFilterTrigger } from '../../lib/focus-filter-trigger';

interface FilterChipGroupProps {
  getFocusRoot: () => HTMLElement | null;
}

export default function FilterChipGroup({
  getFocusRoot,
}: FilterChipGroupProps) {
  const { selectedItems, toggleFilter, resetFilters } = useFilterParam();

  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const edges = useScrollEdges(scrollRef);

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
    <div className="flex min-w-0 flex-1 items-center gap-2 lg:items-start">
      <div
        ref={scrollRef}
        data-fade-start={edges.start || undefined}
        data-fade-end={edges.end || undefined}
        className={cn(
          '-m-1 flex min-w-0 items-center gap-1.5 overflow-x-auto p-1 no-scrollbar lg:flex-wrap lg:overflow-visible',
          SCROLL_FADE_CLASS_NAME,
        )}
      >
        {selectedItems.map(({ group, value, label }, index) => (
          <Button
            key={`${group}-${value}`}
            ref={(element) => {
              chipRefs.current[index] = element;
            }}
            size="xxs"
            variant="secondary"
            aria-label={`${label} 필터 지우기`}
            onClick={() => {
              toggleFilter(group, value);
              setFocusIndex(index);
            }}
            className="shrink-0 cursor-pointer text-xs rounded-2xl font-semibold"
          >
            <span aria-hidden>{label}</span>
            <XIcon
              data-icon="inline-end"
              aria-hidden
              className="size-3 text-foreground/70"
            />
          </Button>
        ))}
      </div>

      <Button
        size="xxs"
        variant="ghost"
        aria-label="필터 모두 지우기"
        onClick={() => {
          resetFilters();
          setFocusIndex(0);
        }}
        className={cn(
          'shrink-0 cursor-pointer text-xs font-medium px-2',
          'underline underline-offset-2 hover:bg-transparent dark:hover:bg-transparent',
        )}
      >
        모두 지우기
      </Button>
    </div>
  );
}
