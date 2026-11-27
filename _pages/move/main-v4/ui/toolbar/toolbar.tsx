'use client';

import { useCallback, useRef } from 'react';

import { cn } from '@/_shared/lib/cn';

import {
  SCROLL_FADE_CLASS_NAME,
  useScrollEdges,
} from '../../lib/use-scroll-edges';
import { MOVE_FILTER_GROUPS, useFilterParam } from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import SearchBar from '../search-bar';
import SortPanel, { type SortProps } from '../sort';
import FilterChipGroup from '../filter-chip-group';
import { AllFilter, FilterPopover } from '../filter';

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
 * 검색 + 필터 + 개수·정렬 + 고른 칩. 필터(결과를 줄인다)와 정렬(순서만 바꾼다)을 나눠 둔다.
 *   md 미만                                   md 이상
 *   [🔍 검색 ·····················][⚙²]       [🔍 검색 ······][⚙²][타입 2 ⌄][분류 ⌄] ········ 기술 94개 | 이름순 ⌄
 *   [불꽃 ✕][물 ✕] ······ 모두 지우기       [불꽃 ✕][물 ✕] 모두 지우기
 *   기술 94개 ··················· 이름순 ⌄
 * 한 grid로 그린다 (DOM 순서: 검색 → 필터 줄 → 개수·정렬 → 칩).
 *   md 미만: 2열 [검색 | ⚙]. 필터 줄에는 ⚙만 보인다 (그룹 버튼은 md 이상만). 개수·정렬은 order-last로 칩 아래, 목록 바로 위 머리말 줄.
 *   md 이상: 3열 [검색(고정 폭) | 필터 줄(남는 폭, 넘치면 가로 스크롤) | 개수·정렬]. 칩은 아래 줄 전체 폭.
 * 높이: md 미만은 검색·⚙ 44px (손가락), md 이상은 검색도 버튼과 같은 36px.
 * [⚙]는 필터 그룹 전부 (md 미만 드로어 · md 이상 다이얼로그), 그룹 버튼은 그 그룹만 (md 이상 팝오버), 정렬은 md 미만 드로어 · md 이상 팝오버.
 * 개수는 aria-live로 바뀔 때 읽힌다 (0개가 되어도 남아 '기술 0개'도 읽힌다).
 * 칩이 없어도 숨기기만 한다: 마지막 칩을 지운 뒤 포커스를 ⚙로 옮기는 FilterChipGroup이 남아 있어야 해서
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

  const filterBarRef = useRef<HTMLDivElement>(null);
  const filterBarEdges = useScrollEdges(filterBarRef);

  const hasChips = selectedItems.length > 0;

  return (
    <div
      ref={rootRef}
      className={cn(
        'grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 md:gap-x-3.5 gap-y-3',
        'md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-3',
      )}
    >
      <SearchBar className={cn('h-11 min-w-0 md:h-10 md:w-64 lg:w-80')} />
      {/* 필터 줄. 넘치면 가로 스크롤. p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게 */}
      <div
        ref={filterBarRef}
        data-fade-start={filterBarEdges.start || undefined}
        data-fade-end={filterBarEdges.end || undefined}
        className={cn(
          '-m-1 flex min-w-0 items-center gap-2 overflow-x-auto p-1 no-scrollbar',
          SCROLL_FADE_CLASS_NAME,
        )}
      >
        <AllFilter resultLabel={resultLabel} filterCounts={filterCounts} />
        {MOVE_FILTER_GROUPS.map((group) => (
          <FilterPopover
            key={group}
            group={group}
            filterCounts={filterCounts}
          />
        ))}
      </div>
      {/* 개수 · 정렬: md 미만은 맨 아래 머리말 줄, md 이상은 첫 줄 오른쪽 끝 */}
      <div
        className={cn(
          'flex min-w-0 items-center justify-between gap-3',
          'max-md:order-last max-md:col-span-2',
        )}
      >
        <p
          aria-live="polite"
          className={cn('shrink-0 text-sm text-foreground/70')}
        >
          {`${COUNT_LABEL} ${resultCount.toLocaleString('ko-KR')}개`}
        </p>
        <div aria-hidden className={cn('h-4 w-px bg-border max-md:hidden')} />
        <SortPanel {...sort} />
      </div>
      <div
        className={cn(
          'col-span-2 min-w-0 md:col-span-3',
          !hasChips && 'hidden',
        )}
      >
        <FilterChipGroup getFocusRoot={getFocusRoot} />
      </div>
    </div>
  );
}
