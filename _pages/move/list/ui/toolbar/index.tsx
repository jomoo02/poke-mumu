'use client';

import { useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import {
  FilterPopover,
  FilterSheet,
  focusVisibleFilterTrigger,
} from '@/_shared/ui/filter';
import type { Type } from '@/_entities/type';
import type { DamageClass } from '@/_entities/damage-class';

import MoveSearchInput from './move-search-input';
import { useMoveFilterGroups } from './use-move-filter-groups';
import { useMoveFilter } from '../../model/move-filter';

interface MoveToolbarProps {
  types: Type[];
  damageClasses: DamageClass[];
  // 시트 닫기 버튼에 보여줄 결과 수
  totalCount: number;
}

// 1줄: [검색][필터 시트]                  ← md 미만 (초기화는 시트 안)
//      [검색]                             ← md 이상
// 2줄: [타입 ▾][분류 ▾] │ [↻ 초기화]      ← md 이상. 초기화는 필터가 켜졌을 때만
// 초기화를 줄 끝에 두어 나타나고 사라져도 트리거가 움직이지 않게 한다.
// 시트·팝오버 트리거는 CSS로 나눈다 (JS matchMedia는 첫 렌더가 한쪽으로 고정돼 트리거가 교체된다)
export default function MoveToolbar({
  types,
  damageClasses,
  totalCount,
}: MoveToolbarProps) {
  const groups = useMoveFilterGroups(types, damageClasses);

  const { isActive, reset } = useMoveFilter();

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
      <div className="flex flex-wrap gap-2">
        <MoveSearchInput className="min-w-0 flex-1" />
        <FilterSheet
          groups={groups}
          resultLabel={`${totalCount}개 기술 보기`}
          onResetAll={reset}
          className="md:hidden"
        />
      </div>
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
