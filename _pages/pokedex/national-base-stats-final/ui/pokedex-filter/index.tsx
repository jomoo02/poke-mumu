'use client';

import { useRef } from 'react';

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
 * lg 미만: [검색] / [타입⌄ 모습⌄ 세대⌄ 모두 지우기]  ← 줄 전체가 가로 스크롤 (개수는 결과 줄)
 * lg 이상: [검색 (w-80)] [타입⌄] [모습⌄] [세대⌄] 모두 지우기          개수
 *   검색을 고정 폭으로 두고 트리거를 바로 뒤에 붙여 한 덩어리로 읽히게 한다 (GitHub·shadcn Tasks 같은 데이터 표 방식).
 *   팝오버는 모두 1열 목록(max-h-80)이라 트리거가 한 줄에 나란해도 폭이 들쭉날쭉하지 않다.
 *   모두 지우기(필터만)는 트리거 뒤라 나타나도 트리거가 밀리지 않는다
 */
export default function PokedexFilter({ resultCount }: PokedexFilterProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const groups = usePokeFilterGroups();

  const { isFilterActive, resetFilters } = useFilterParam();

  return (
    <div
      ref={rootRef}
      className="flex flex-col gap-3 lg:flex-row lg:items-center"
    >
      <PokeSearchBar className="lg:max-w-1/3 lg:shrink-0" />
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게 */}
        <div className="-m-1 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar p-1">
          {groups.map((group) => (
            <FilterCheckboxControl
              key={group.key}
              group={group}
              resultLabel={`${resultCount.toLocaleString('ko-KR')}마리 보기`}
              popoverLayout="list"
              className="shrink-0"
            />
          ))}
          {isFilterActive && (
            <Button
              variant="ghost"
              onClick={() => {
                resetFilters();
                // 이 버튼은 사라지므로 포커스를 지금 보이는 첫 필터 트리거로
                if (rootRef.current) {
                  focusVisibleFilterTrigger(rootRef.current);
                }
              }}
              aria-label="필터 모두 지우기"
              className="h-10 shrink-0 px-2 text-sm text-foreground/70"
            >
              모두 지우기
            </Button>
          )}
        </div>
        <ResultCount className="hidden lg:block" count={resultCount} />
      </div>
    </div>
  );
}
