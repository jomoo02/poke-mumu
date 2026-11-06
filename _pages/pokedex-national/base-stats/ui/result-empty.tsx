'use client';

import { RotateCwIcon, XIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { focusVisibleFilterTrigger } from '@/_shared/ui/filter';

import { POKE_FILTER_RULES, useFilterParam } from '../model/filter';
import { useKeywordParam } from '../model/search';

// 툴바의 꺼진 버튼과 같은 모양
const ACTION_BUTTON_CLASS = cn(
  'h-10 gap-2 px-4 text-foreground/70',
  'bg-input/50 dark:bg-input/70',
  '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
);

/**
 * 결과 0개. 왜 비었는지와 바로 할 수 있는 동작을 함께 보여준다.
 * - 원인 안내 (타입 두 개 / 필터 / 검색어)
 * - 원인마다 따로 지우는 버튼: 검색어가 있으면 '검색어 지우기', 필터가 켜져 있으면 '필터 모두 지우기'
 *   (하나로 모두 지우지 않고 무엇이 지워지는지 보이게. 결정 문서 2026-10-30)
 */
export default function ResultEmpty() {
  const { keyword, clearKeyword } = useKeywordParam();

  const { filter, isFilterActive, resetFilters } = useFilterParam();

  // 타입 필터는 AND라 두 타입을 고르면 그 복합 타입만 남는다는 것을 알려 준다
  const isTypeFull =
    filter.type.length >= (POKE_FILTER_RULES.type.max ?? Infinity);

  const hint = isTypeFull
    ? '고른 두 타입을 모두 가진 포켓몬만 보여요. 타입을 하나 빼 보세요'
    : isFilterActive
      ? '필터를 줄이거나 검색어를 바꿔 보세요'
      : '검색어를 바꿔 보세요';

  return (
    <div className="flex flex-col items-start gap-1 py-6">
      <p className="font-medium">조건에 맞는 포켓몬이 없어요</p>
      <p className="text-sm text-muted-foreground">{hint}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {/* 누르면 결과가 생겨 이 화면이 사라지므로 포커스를 지금 보이는 필터 트리거로 */}
        {keyword !== '' && (
          <Button
            variant="secondary"
            onClick={() => {
              clearKeyword();
              focusVisibleFilterTrigger();
            }}
            className={ACTION_BUTTON_CLASS}
          >
            <XIcon aria-hidden className="size-3.5" />
            검색어 지우기
          </Button>
        )}
        {isFilterActive && (
          <Button
            variant="secondary"
            onClick={() => {
              resetFilters();
              focusVisibleFilterTrigger();
            }}
            className={ACTION_BUTTON_CLASS}
          >
            <RotateCwIcon aria-hidden className="size-3.5" />
            필터 모두 지우기
          </Button>
        )}
      </div>
    </div>
  );
}
