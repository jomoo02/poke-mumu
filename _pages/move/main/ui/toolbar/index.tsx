import { useCallback, useRef } from 'react';

import type { MoveFilterCounts } from '../../model/move-results';
import { FilterChips, FilterSheet } from './filter';
import SearchBar from './search-bar';

interface ToolbarProps {
  // 지금 결과 수 (필터 시트의 'N개 보기')
  resultCount: number;
  // 필터 선택지 옆 숫자
  filterCounts: MoveFilterCounts;
}

/**
 * 검색 + 통합 필터 (전국도감 종족값과 같은 표 페이지 툴바).
 * [🔍 기술 검색 ……………………………… ][⚙ 필터 N]   ← 검색창이 남는 폭을 다 써 트리거와 붙는다
 * [불꽃 ✕] [물 ✕] [물리 ✕] 모두 지우기        ← 고른 값이 있을 때만
 * 개수는 결과 줄(표 위, 모바일은 개수 · 정렬)에 보인다
 */
export default function Toolbar({ resultCount, filterCounts }: ToolbarProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const getFocusRoot = useCallback(() => rootRef.current, []);

  const resultLabel = `${resultCount.toLocaleString('ko-KR')}개 보기`;

  return (
    <div ref={rootRef}>
      <div className="flex items-center justify-between gap-3">
        <SearchBar className="flex-1" />
        <FilterSheet resultLabel={resultLabel} filterCounts={filterCounts} />
      </div>
      <FilterChips getFocusRoot={getFocusRoot} />
    </div>
  );
}
