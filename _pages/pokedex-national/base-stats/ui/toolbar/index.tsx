import { useCallback, useRef } from 'react';

import { FilterChips, FilterSheet } from './filter';
import SearchBar from './search-bar';

interface ToolbarProps {
  // 지금 결과 수 (필터 시트의 'N마리 보기')
  resultCount: number;
}

/**
 * 검색 + 통합 필터 (기술 페이지와 같은 표 페이지 툴바).
 * [🔍 이름·도감번호 검색 ……………………… ][⚙ 필터 N]   ← 검색창이 남는 폭을 다 써 트리거와 붙는다
 * [불꽃 ✕] [비행 ✕] [알로라의 모습 ✕]              ← 고른 값이 있을 때만
 * 개수는 결과 줄(표 위, 모바일은 개수 · 정렬)에 보인다
 */
export default function Toolbar({ resultCount }: ToolbarProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const getFocusRoot = useCallback(() => rootRef.current, []);

  const resultLabel = `${resultCount.toLocaleString('ko-KR')}마리 보기`;

  return (
    <div ref={rootRef} className="mb-3">
      <div className="flex items-center justify-between gap-3">
        <SearchBar className="flex-1" />
        <FilterSheet resultLabel={resultLabel} />
      </div>
      <FilterChips getFocusRoot={getFocusRoot} />
    </div>
  );
}
