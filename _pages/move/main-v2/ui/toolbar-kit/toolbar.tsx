'use client';

import { useCallback, useRef } from 'react';

import { useFilterParam } from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import SearchBar from '../search-bar';
import FilterChips from './filter-chips';
import FilterSheet from './filter-sheet';

interface ToolbarProps {
  // 지금 결과 수 ('기술 94개' · 필터 시트의 'N개 보기')
  resultCount: number;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
  // 정렬 칩 (lg 미만만 보인다. lg 이상은 표 머리글로 정렬)
  sort: React.ReactNode;
}

const COUNT_LABEL = '기술';

/**
 * 검색 + 통합 필터 툴바
 *   lg 미만  [🔍 검색 ……………………………][⚙]
 *            기술 94개 ··················· [이름순 ⌄]
 *            [불꽃 ✕][물 ✕] →                         ← 고른 값이 있을 때만, 가로 스크롤
 *   lg 이상  [🔍 검색 (최대 1/2) ·············· ][⚙ 필터]
 *            기술 94개 │ [불꽃 ✕][물 ✕]                ← 개수가 칩 줄의 머리. 칩은 줄바꿈 (정렬은 표 머리글)
 * 둘째 줄 하나를 줄바꿈되는(flex-wrap) 묶음으로 두고 폭별로 칩 자리를 바꾼다: 칩·정렬을 한 번만 그리기 위해.
 * 개수 변화는 목록 아래 'N개 중 a–b'가 스크린리더에 알린다 (두 번 읽지 않게 여기는 알리지 않는다)
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
    <div ref={rootRef} className="flex min-w-0 flex-col gap-3">
      {/* 검색 + 필터. lg 이상은 검색 최대 1/2, 필터는 오른쪽 끝 */}
      <div className="flex min-w-0 items-center gap-2">
        <SearchBar className="h-11 min-w-0 flex-1 lg:max-w-1/2" />
        <div className="flex shrink-0 lg:ml-auto">
          <FilterSheet resultLabel={resultLabel} filterCounts={filterCounts} />
        </div>
      </div>
      {/* 개수 + (lg 미만) 정렬, 칩은 lg 미만은 다음 줄 · lg 이상은 개수 옆 */}
      <div className="flex min-h-9 min-w-0 flex-wrap items-center gap-x-2 gap-y-3">
        <p className="shrink-0 text-md font-semibold whitespace-nowrap tabular-nums">
          <span className="font-normal text-foreground/70">{COUNT_LABEL}</span>{' '}
          {resultCount.toLocaleString('ko-KR')}개
        </p>
        {hasChips && (
          // 개수 │ 칩 구분선 (lg 이상, 칩이 있을 때만)
          <span
            aria-hidden
            className="mx-1 hidden h-4 w-px shrink-0 bg-border lg:block"
          />
        )}
        <div className="ml-auto flex shrink-0 lg:hidden">{sort}</div>
        <FilterChips getFocusRoot={getFocusRoot} />
      </div>
    </div>
  );
}
