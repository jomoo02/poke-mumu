'use client';

import { useCallback, useRef } from 'react';

import { cn } from '@/_shared/lib/cn';

import { useScrollEdges } from '../../lib/use-scroll-edges';
import { MOVE_FILTER_GROUPS, useFilterParam } from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import { AllPanel, FilterChips, GroupPanel } from '../filter';
import { SCROLL_FADE_CLASS_NAME } from '../panel';
import SearchBar from '../search-bar';
import { SortPanel, type SortProps } from '../sort';

interface ToolbarProps {
  // 지금 결과 수 (개수 줄 · 패널 아래 버튼 'N개 보기')
  resultCount: number;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
  // 정렬 상태와 바꾸기 (개수 옆 정렬 패널)
  sort: SortProps;
}

const COUNT_LABEL = '기술';

/**
 * 검색 + 필터 줄 + 고른 칩 + 개수·정렬. 필터(결과를 줄인다)와 정렬(순서만 바꾼다)을 나눠 둔다.
 *   md 미만                                   md 이상
 *   [🔍 검색 ·························]       [🔍 검색 ·······················································]
 *   [⚙][타입 2 ⌄][분류 ⌄] ··········]       [⚙][타입 2 ⌄][분류 ⌄] ················· 기술 312개 | [이름순 ⌄]
 *   [불꽃 ✕][물 ✕] ······ 모두 지우기       [불꽃 ✕][물 ✕] 모두 지우기
 *   기술 312개 ··············· [이름순 ⌄]
 * md 미만은 개수·정렬을 목록 바로 위 머리말 줄로 (DOM은 칩 앞이지만 order-last로 맨 아래).
 * md 이상은 필터 줄 오른쪽에 붙이고 칩은 그 아래 전체 폭.
 * [⚙]는 필터 그룹 전부 (md 미만 드로어 · md 이상 다이얼로그), 그룹·정렬 버튼은 그것만 (md 미만 드로어 · md 이상 팝오버).
 * 개수는 aria-live로 바뀔 때 읽힌다 (0개가 되어도 남아 '기술 0개'도 읽힌다).
 * 칩이 없어도 숨기기만 한다: 마지막 칩을 지운 뒤 포커스를 필터 트리거로 옮기는 FilterChips가 남아 있어야 해서
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

  const barRef = useRef<HTMLDivElement>(null);
  const barEdges = useScrollEdges(barRef);

  const hasChips = selectedItems.length > 0;

  return (
    <div ref={rootRef} className="flex min-w-0 flex-col gap-3">
      <SearchBar className="h-11 w-full min-w-0" />
      <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        {/* 필터 줄. 넘치면 가로 스크롤. p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게 */}
        <div
          ref={barRef}
          data-fade-start={barEdges.start || undefined}
          data-fade-end={barEdges.end || undefined}
          className={cn(
            '-m-1 flex min-w-0 items-center gap-2 overflow-x-auto p-1 no-scrollbar',
            SCROLL_FADE_CLASS_NAME,
          )}
        >
          <AllPanel resultLabel={resultLabel} filterCounts={filterCounts} />
          {MOVE_FILTER_GROUPS.map((group) => (
            <GroupPanel
              key={group}
              group={group}
              resultLabel={resultLabel}
              filterCounts={filterCounts}
            />
          ))}
        </div>
        {/* 개수 · 정렬: md 미만은 맨 아래 머리말 줄, md 이상은 필터 줄 오른쪽 */}
        <div className="flex min-w-0 items-center justify-between gap-3 max-md:order-last">
          <p
            aria-live="polite"
            className="shrink-0 text-sm text-foreground/70"
          >
            {`${COUNT_LABEL} ${resultCount.toLocaleString('ko-KR')}개`}
          </p>
          <div aria-hidden className="h-4 w-px bg-border max-md:hidden" />
          <SortPanel {...sort} />
        </div>
        <div className={cn('min-w-0 md:col-span-2', !hasChips && 'hidden')}>
          <FilterChips getFocusRoot={getFocusRoot} />
        </div>
      </div>
    </div>
  );
}
