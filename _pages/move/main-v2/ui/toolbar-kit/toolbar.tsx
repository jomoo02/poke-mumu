'use client';

import { useCallback, useRef } from 'react';

import { cn } from '@/_shared/lib/cn';

import { useFilterParam } from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import SearchBar from '../search-bar';
import FilterChips from './filter-chips';
import FilterSheet from './filter-sheet';

interface ToolbarProps {
  // 지금 결과 수 (필터 시트의 'N개 보기')
  resultCount: number;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
  // 정렬 칩 (lg 미만만 보인다. lg 이상은 표 머리글로 정렬)
  sort: React.ReactNode;
}

/**
 * 검색 + 통합 필터 (도감 종족값 페이지와 같은 툴바). 결과 수는 목록 아래 ('N개 중 a–b')
 *   lg 이상  [🔍 검색 ……………………………………………][⚙ 필터 2]   ← 검색창이 남는 폭을 다 써 트리거와 붙는다
 *            [불꽃 ✕][물 ✕]                                 ← 고른 값이 있을 때만, 줄바꿈
 *   lg 미만  [🔍 검색 ………………………][⚙²]
 *            [불꽃 ✕][물 ✕] → ··········· [↕ 이름순]        ← 칩은 가로 스크롤, 정렬은 오른쪽 끝 고정
 * lg 이상은 정렬이 없어 고른 칩이 없으면 둘째 줄을 숨긴다
 */
export default function Toolbar({
  resultCount,
  filterCounts,
  sort,
}: ToolbarProps) {
  const resultLabel = `${resultCount.toLocaleString('ko-KR')}개 보기`;
  const { selectedItems } = useFilterParam();

  const rootRef = useRef<HTMLDivElement>(null);
  const getFocusRoot = useCallback(() => rootRef.current, []);

  const hasChips = selectedItems.length > 0;

  return (
    <div ref={rootRef} className="flex min-w-0 flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <SearchBar className="h-11 min-w-0 flex-1 lg:max-w-1/2" />
        <FilterSheet resultLabel={resultLabel} filterCounts={filterCounts} />
      </div>
      <div
        className={cn(
          'flex min-w-0 items-center gap-2',
          !hasChips && 'lg:hidden',
        )}
      >
        <FilterChips getFocusRoot={getFocusRoot} />
        <div className="shrink-0">{sort}</div>
      </div>
    </div>
  );
}
