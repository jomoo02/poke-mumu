'use client';

import { useEffect, useRef, useState } from 'react';
import { RotateCwIcon, XIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { useScrollEdges } from '../../lib/use-scroll-edges';
import { useFilterParam } from '../../model/filter';
import { focusVisibleFilterTrigger } from './focus-filter-trigger';

interface FilterChipsProps {
  // 칩을 모두 지운 뒤 포커스를 돌려줄 필터 트리거가 들어 있는 영역 (툴바)
  getFocusRoot: () => HTMLElement | null;
}

// 칩과 같은 모양 (테두리 · 다크 배경)
const CHIP_CLASS_NAME = 'shrink-0 cursor-pointer dark:bg-card';

/**
 * 고른 값 칩: [⟳][불꽃 ✕][물 ✕]. 순서는 그룹 순서 → 고른 순서.
 * 맨 앞 [⟳]는 필터 모두 지우기 (칩과 같은 모양의 아이콘 버튼, 칩이 하나라도 있으면 보인다. 검색어는 둔다).
 * lg 미만은 [⟳]를 왼쪽에 고정하고 칩만 한 줄 가로 스크롤 (넘친 쪽 끝 24px을 흐려 더 있음을 알린다),
 * lg 이상은 칩이 줄바꿈되고 [⟳]는 첫 줄 왼쪽. 줄 배치는 Toolbar가 잡는다.
 * 칩을 지우면 그 자리의 다음 칩(없으면 앞 칩)으로, 모두 지우면 필터 트리거로 포커스를 옮긴다
 */
export default function FilterChips({ getFocusRoot }: FilterChipsProps) {
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
    // 줄 자리·보이기는 Toolbar가 정한다 (lg 미만 칩 줄 · lg 이상 개수 옆)
    // gap-3: 칩 영역의 -m-1(포커스 링 여유)을 빼면 [⟳]와 첫 칩 사이가 칩 사이와 같은 8px
    <div className="flex min-w-0 flex-1 items-center gap-2 lg:items-start">
      {/* 칩이 0개가 되면 이 줄이 숨으므로 포커스는 필터 트리거로 (칩을 모두 지울 때와 같다) */}
      <Button
        size="icon-xs"
        variant="outline"
        aria-label="필터 모두 지우기"
        onClick={() => {
          resetFilters();
          setFocusIndex(0);
        }}
        className={CHIP_CLASS_NAME}
      >
        <RotateCwIcon aria-hidden className="size-3.5 text-foreground/70" />
      </Button>
      {/* p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게
          넘친 쪽 끝을 마스크로 흐린다: data-fade-start/end에 따라 왼쪽·오른쪽 흐림 길이 0 ↔ 24px로 (lg 이상은 줄바꿈이라 넘치지 않는다) */}
      <div
        ref={scrollRef}
        data-fade-start={edges.start || undefined}
        data-fade-end={edges.end || undefined}
        className={cn(
          '-m-1 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto p-1 no-scrollbar lg:flex-wrap lg:overflow-visible',
          '[--fade-end:0px] [--fade-start:0px] data-fade-end:[--fade-end:24px] data-fade-start:[--fade-start:24px]',
          'mask-[linear-gradient(to_right,transparent,#000_var(--fade-start),#000_calc(100%-var(--fade-end)),transparent)]',
        )}
      >
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
            className={CHIP_CLASS_NAME}
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
    </div>
  );
}
