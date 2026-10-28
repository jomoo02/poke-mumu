'use client';

import { useRef } from 'react';

import { focusVisibleFilterTrigger } from '@/_shared/ui/filter';

import type { PokeFilterOptions } from '../../model/filter';
import PokeFilterRow from './poke-filter-row';
import PokeSearchBar from './poke-search-bar';
import ResultCount from '../result-count';

interface PokeToolbarProps {
  filterOptions: PokeFilterOptions;
  // 지금 결과 수
  resultCount: number;
}

// 좁은 본문: 1줄 [🔍 검색] / 2줄 [↻ 초기화 │ 한국어⌄ 타입⌄ 모습⌄ 세대⌄ ···]
// 넓은 본문(@5xl/view): 한 줄 [🔍 검색] [↻ 초기화 │ 한국어⌄ 타입⌄ 모습⌄ 세대⌄]      개수
export default function PokedexFilter({
  filterOptions,
  resultCount,
}: PokeToolbarProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={rootRef}
      // className="flex flex-col gap-4 @5xl/view:flex-row @5xl/view:items-center @5xl/view:gap-3"
      className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-3"
    >
      <PokeSearchBar className="lg:max-w-sm" />
      <PokeFilterRow
        filterOptions={filterOptions}
        resultCount={resultCount}
        // 초기화 버튼은 사라지므로 포커스를 지금 보이는 첫 필터 트리거로.
        // (검색 입력창으로 옮기면 모바일에서 키보드가 올라온다)
        onReset={() => {
          if (rootRef.current) {
            focusVisibleFilterTrigger(rootRef.current);
          }
        }}
      />
      <ResultCount className="hidden lg:block" count={resultCount} />
    </div>
  );
}
