'use client';

import { useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { FilterPopover, focusVisibleFilterTrigger } from '@/_shared/ui/filter';
import type { Type } from '@/_entities/type';
import { usePokeFilter } from '@/_pages/pokedex/national-base-stats-v0/model/poke-filter';
// 정리 전까지 기존 툴바의 필터 그룹 구성을 그대로 쓴다
import { usePokeFilterGroups } from '@/_pages/pokedex/national-base-stats-v0/ui/toolbar/use-poke-filter-groups';

import PokeSearchBar from '@/_pages/pokedex/national-base-stats/ui/toolbar/poke-search-bar';

interface PokeToolbarProps {
  types: Type[];
}

// 1줄: [한 ⌄ │ 🔍 검색]
// 2줄: [타입 ▾] │ [↻ 초기화]      ← md 이상. 초기화는 필터가 켜졌을 때만
// TODO: md 미만 필터는 /pokedex/national처럼 칩 줄로 다시 만든다 (그전까지 좁은 화면엔 필터가 없다)
export default function PokeToolbar({ types }: PokeToolbarProps) {
  const groups = usePokeFilterGroups(types);

  const { isActive, reset } = usePokeFilter();

  const rootRef = useRef<HTMLDivElement>(null);

  // 초기화 버튼은 누르면 사라지므로 포커스를 지금 보이는 필터 트리거로
  const resetFilters = () => {
    reset();

    if (rootRef.current) {
      focusVisibleFilterTrigger(rootRef.current);
    }
  };

  return (
    <div ref={rootRef} className="flex flex-col gap-4">
      <PokeSearchBar />
      <div className="hidden shrink-0 gap-3 md:flex md:items-center">
        {groups.map((group) => (
          <FilterPopover
            key={group.key}
            group={group}
            className="max-w-48 lg:max-w-60"
          />
        ))}
        {isActive && (
          <>
            <div aria-hidden className="h-6 w-px bg-border" />
            {/* 꺼진 필터 트리거와 같은 모양, 글자만 옅게 (필터가 아닌 동작임을 구분) */}
            <Button
              variant="secondary"
              onClick={resetFilters}
              aria-label="필터 초기화"
              className={cn(
                'h-10 gap-2 text-foreground/70',
                'bg-input/50 dark:bg-input/70',
                '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
              )}
            >
              <RotateCwIcon aria-hidden className="size-3.5" />
              초기화
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
