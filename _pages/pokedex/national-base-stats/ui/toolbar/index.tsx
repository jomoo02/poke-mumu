'use client';

import { useRef } from 'react';

import { focusVisibleFilterTrigger } from '@/_shared/ui/filter';

import type { PokeFilterOptions } from '../../model/poke-filter';
import PokeFilterRow from './poke-filter-row';
import PokeSearchBar from './poke-search-bar';

interface PokeToolbarProps {
  filterOptions: PokeFilterOptions;
  // 지금 결과 수 (시트의 '120마리 보기')
  resultCount: number;
}

// 1줄: [🔍 검색]
// 2줄: [↻ 초기화] │ [한국어 ⌄] [모든 타입 ⌄] [모든 모습 ⌄] [모든 세대 ⌄]
export default function PokeToolbar({
  filterOptions,
  resultCount,
}: PokeToolbarProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef} className="flex flex-col gap-4">
      <PokeSearchBar />
      <PokeFilterRow
        filterOptions={filterOptions}
        resultLabel={`${resultCount.toLocaleString('ko-KR')}마리 보기`}
        // 초기화 버튼은 사라지므로 포커스를 지금 보이는 첫 필터 트리거로.
        // (검색 입력창으로 옮기면 모바일에서 키보드가 올라온다)
        onReset={() => {
          if (rootRef.current) {
            focusVisibleFilterTrigger(rootRef.current);
          }
        }}
      />
    </div>
  );
}
