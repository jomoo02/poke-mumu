'use client';

import { useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import {
  FilterCheckboxControl,
  focusVisibleFilterTrigger,
} from '@/_shared/ui/filter';

import { useFilterParam } from '../../model/filter';
import ResultCount from '../result-count';
import PokeSearchBar from './poke-search-bar';
import { usePokeFilterGroups } from './use-poke-filter-groups';

interface PokedexFilterProps {
  // 지금 결과 수 (lg 이상 줄 끝 개수, 모바일 시트의 'N마리 보기')
  resultCount: number;
}

/**
 * 검색 + 묶음별 필터 (2026-10-30 결정: 표 페이지 툴바).
 * 데스크톱은 묶음마다 팝오버(1열 목록), 모바일은 묶음마다 바텀시트. 통합 시트는 쓰지 않는다.
 * [검색]
 * [↻ 초기화] | [타입⌄] [모습⌄] [세대⌄]          개수(lg 이상)
 *                ← 트리거만 가로 스크롤 (lg 미만은 개수가 결과 줄에)
 * 초기화는 필터 전체 하나뿐이다 (묶음이 몇 개 없어 묶음별 초기화는 두지 않는다. 결정 2026-11-04).
 * 왼쪽에 늘 두어 모바일 가로 스크롤에도 보이고, 고른 게 없으면 비활성이라 줄이 움직이지 않는다.
 * 모바일은 아이콘만 (접근 이름 '필터 모두 지우기')
 */
export default function PokedexFilter({ resultCount }: PokedexFilterProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const groups = usePokeFilterGroups();

  const { isFilterActive, resetFilters } = useFilterParam();

  return (
    <div ref={rootRef} className="flex flex-col gap-3 ">
      <PokeSearchBar />
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Button
          variant="ghost"
          onClick={() => {
            resetFilters();
            // 이 버튼은 비활성이 되므로 포커스를 지금 보이는 첫 필터 트리거로
            if (rootRef.current) {
              focusVisibleFilterTrigger(rootRef.current);
            }
          }}
          disabled={!isFilterActive}
          aria-label="필터 모두 지우기"
          className={cn(
            'h-10 shrink-0 gap-1.5 px-0 w-10 md:w-auto md:px-3.5',
            'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
          )}
        >
          <RotateCwIcon aria-hidden className="size-3.5" />
          <span className="hidden md:inline">초기화</span>
        </Button>
        {/* 초기화와 필터 묶음을 나눈다 (초기화가 필터 하나처럼 보이지 않게) */}
        <div aria-hidden className="h-5 w-px shrink-0 bg-border" />
        {/* p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게 */}
        <div className="-m-1 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar p-1">
          {groups.map((group) => (
            <FilterCheckboxControl
              key={group.key}
              group={group}
              resultLabel={`${resultCount.toLocaleString('ko-KR')}마리 보기`}
              showGroupReset={false}
              className="shrink-0"
            />
          ))}
        </div>
        <ResultCount className="hidden lg:block" count={resultCount} />
      </div>
    </div>
  );
}
