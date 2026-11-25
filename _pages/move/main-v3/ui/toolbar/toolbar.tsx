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
  // 지금 결과 수 (패널 아래 버튼 'N개 보기' · 스크린리더 알림)
  resultCount: number;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
  // 정렬 상태와 바꾸기 (정렬 패널 · 전체 패널의 정렬 섹션)
  sort: SortProps;
}

const COUNT_LABEL = '기술';

/**
 * 검색 + 버튼 줄 + 고른 칩
 *   [🔍 검색 ·································································]   ← 전체 폭
 *   [⚙ 필터][타입 2 ⌄][분류 ⌄] ······························· [이름순 ⌄]   ← 한 묶음. 넘치면 가로 스크롤 (정렬은 묶음 맨 끝)
 *   [불꽃 ✕][물 ✕] ············································ [⟳]   ← 고른 값이 있을 때만
 * [⚙]는 필터 그룹 전부 + 정렬 (md 미만 드로어 · md 이상 다이얼로그), 그룹·정렬 버튼은 그것만 (md 미만 드로어 · md 이상 팝오버).
 * 정렬은 md 미만은 그룹 버튼 바로 뒤에 붙고, md 이상은 ml-auto로 오른쪽 끝 (넘치면 묶음 끝에 이어진다. [⚙] 안에도 정렬이 있어 스크롤 없이도 바꿀 수 있다).
 * 결과 수는 화면에 두지 않고 스크린리더만 읽는다 (aria-live, 0개가 되어도 남아 '기술 0개'도 읽힌다).
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
      {/* 버튼 줄. p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게 */}
      <div
        ref={barRef}
        data-fade-start={barEdges.start || undefined}
        data-fade-end={barEdges.end || undefined}
        className={cn(
          '-m-1 flex min-w-0 items-center gap-2 overflow-x-auto p-1 no-scrollbar',
          SCROLL_FADE_CLASS_NAME,
        )}
      >
        <AllPanel
          resultLabel={resultLabel}
          filterCounts={filterCounts}
          sort={sort}
        />
        {MOVE_FILTER_GROUPS.map((group) => (
          <GroupPanel
            key={group}
            group={group}
            resultLabel={resultLabel}
            filterCounts={filterCounts}
          />
        ))}
        {/* md 미만은 그룹 버튼 바로 뒤에 붙이고, md 이상은 오른쪽 끝 */}
        <div className="flex shrink-0 md:ml-auto">
          <SortPanel {...sort} />
        </div>
      </div>
      <div className={cn('min-w-0', !hasChips && 'hidden')}>
        <FilterChips getFocusRoot={getFocusRoot} />
      </div>
      <p aria-live="polite" className="sr-only">
        {`${COUNT_LABEL} ${resultCount.toLocaleString('ko-KR')}개`}
      </p>
    </div>
  );
}
