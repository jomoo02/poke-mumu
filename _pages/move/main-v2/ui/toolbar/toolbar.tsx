'use client';

import { useCallback, useRef } from 'react';

import { cn } from '@/_shared/lib/cn';

import { useFilterParam } from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import { Filter, FilterChips } from '../filter';
import SearchBar from '../search-bar';

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
 *            [불꽃 ✕][물 ✕] →                         ← 고른 값이 있을 때만, 가로 스크롤 (필터 바로 아래)
 *            기술 94개 ··················· [이름순 ⌄]   ← 목록 바로 위
 *   lg 이상  [🔍 검색 (최대 1/2) ·············· ][⚙ 필터]
 *            기술 94개 │ [불꽃 ✕][물 ✕]                ← 개수가 칩 줄의 머리. 칩은 줄바꿈 (정렬은 표 머리글)
 * 칩은 자리가 달라 두 군데에 그리고 폭으로 하나만 보인다 (CSS order는 쓰지 않는다: 화면·읽는 순서를 맞추려고).
 * 칩이 없어도 숨기기만 한다: 마지막 칩을 지운 뒤 포커스를 필터 트리거로 옮기는 FilterChips가 남아 있어야 해서
 * 결과 수는 여기에만 둔다 (목록 아래엔 없다). 바뀌면 스크린리더가 읽는다 (aria-live, 0개가 되어도 남아 있어 '기술 0개'도 읽힌다)
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
      <div className="flex min-w-0 items-center gap-2 lg:gap-x-3.5">
        <SearchBar className="h-11 min-w-0 flex-1 lg:max-w-1/2" />
        <div className="flex shrink-0 lg:ml-auto">
          <Filter resultLabel={resultLabel} filterCounts={filterCounts} />
        </div>
      </div>
      {/* lg 미만: 고른 칩 줄 (필터 바로 아래) */}
      <div className={cn('min-w-0 lg:hidden', !hasChips && 'hidden')}>
        <FilterChips getFocusRoot={getFocusRoot} />
      </div>
      {/* 개수 + 정렬(lg 미만) · 개수 │ 칩(lg 이상) */}
      <div className="flex min-h-8.5 min-w-0 items-center gap-2 lg:items-center">
        <p
          aria-live="polite"
          className="flex h-8.5 shrink-0 items-center text-md font-semibold whitespace-nowrap tabular-nums"
        >
          <span className="text-sm font-medium">
            {`${COUNT_LABEL} ${resultCount.toLocaleString('ko-KR')}개`}
          </span>
        </p>
        {/* lg 이상: 개수 │ 고른 칩 (줄바꿈) */}
        <div
          className={cn(
            'hidden min-w-0 flex-1 items-center h-full gap-2 lg:flex',
            !hasChips && 'lg:hidden',
          )}
        >
          <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-border" />
          <FilterChips getFocusRoot={getFocusRoot} />
        </div>
        <div className="ml-auto flex shrink-0 lg:hidden">{sort}</div>
      </div>
    </div>
  );
}
