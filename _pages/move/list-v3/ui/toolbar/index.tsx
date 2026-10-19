'use client';

import { useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { FilterPopover, focusVisibleFilterTrigger } from '@/_shared/ui/filter';
import type { Type } from '@/_entities/type';
import type { DamageClass } from '@/_entities/damage-class';
// 비교용 페이지라 기존 기술 목록의 검색창·필터 그룹·필터 상태를 그대로 쓴다
import MoveSearchInput from '@/_pages/move/list/ui/toolbar/move-search-input';
import { useMoveFilterGroups } from '@/_pages/move/list/ui/toolbar/use-move-filter-groups';
import { useMoveFilter } from '@/_pages/move/list/model/move-filter';

import FilterGroupSheet from './filter-group-sheet';
import MoveSortMenu from '../sort-menu';
import { useSortSheetUi } from '../../model/use-sort-sheet-ui';

interface MoveToolbarProps {
  types: Type[];
  damageClasses: DamageClass[];
  totalCount: number;
}

// 1줄: [검색]
// 2줄: [타입 ▾][분류 ▾] │ [↻ 초기화]                 전체 N개   ← lg 이상 (정렬은 테이블 머리글)
//      [타입 ▾][분류 ▾] │ [↻ 초기화]                            ← lg 미만
// 3줄: 전체 N개                            [기술번호순 ▾]        ← lg 미만 (카드라 머리글이 없다)
// 필터 트리거는 md 미만 그룹별 바텀시트, md 이상 팝오버 (같은 모양, CSS로 나눈다)
// 초기화는 필터가 켜졌을 때만, 트리거 뒤에 두어 나타나고 사라져도 트리거가 움직이지 않게 한다
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

  const resultLabel = `${totalCount}개 기술 보기`;

  // 정렬 메뉴(비교용)는 데스크탑에서도 같은 메뉴를 보여 준다 (나머지는 lg 이상 테이블 머리글로 정렬)
  const { sortSheetUi } = useSortSheetUi();

  return (
    <div ref={rootRef} className="flex flex-col gap-4">
      <MoveSearchInput />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex w-full min-w-0 items-center gap-2 md:gap-3 lg:w-auto">
          {groups.map((group) => (
            <div key={group.key} className="flex min-w-0">
              <FilterGroupSheet
                group={group}
                resultLabel={resultLabel}
                className="max-w-40 md:hidden"
              />
              <FilterPopover
                group={group}
                className="hidden max-w-48 md:inline-flex lg:max-w-60"
              />
            </div>
          ))}
          {isActive && (
            <>
              <div aria-hidden className="h-6 w-px shrink-0 bg-border" />
              {/* 꺼진 필터 트리거와 같은 모양, 글자만 옅게 (필터가 아닌 동작임을 구분) */}
              <Button
                variant="secondary"
                onClick={resetFilters}
                aria-label="필터 초기화"
                className={cn(
                  'h-10 shrink-0 gap-2 text-foreground/70',
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
        <div className="flex flex-1 items-center justify-between gap-6 lg:justify-end">
          <p
            aria-live="polite"
            className="text-sm font-medium whitespace-nowrap text-foreground/70"
          >
            전체 {totalCount}개
          </p>
          <MoveSortMenu
            className={sortSheetUi === 'menu' ? undefined : 'lg:hidden'}
          />
        </div>
      </div>
    </div>
  );
}
