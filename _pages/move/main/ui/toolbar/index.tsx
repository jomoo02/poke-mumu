import type { MoveFilterCounts } from '../../model/move-results';
import { FilterSheet } from './filter';
import SearchBar from './search-bar';

interface ToolbarProps {
  // 지금 결과 수 (필터 시트의 'N개 보기')
  resultCount: number;
  // 검색할 범위의 수 (검색창 안내)
  scopeCount: number;
  // 필터 선택지 옆 숫자
  filterCounts: MoveFilterCounts;
}

/**
 * 검색 + 통합 필터 (전국도감 종족값과 같은 표 페이지 툴바).
 * [🔍 기술 400개 중 검색 ] ……………… [⚙ 필터 N]
 * lg 미만은 [검색][⚙] 한 줄. 개수는 검색창 안내(검색할 범위)와 필터 시트('N개 보기')에만 보인다.
 * 고른 값(칩)은 필터 시트 안에서 보여 툴바 높이는 늘 같다
 */
export default function Toolbar({
  resultCount,
  scopeCount,
  filterCounts,
}: ToolbarProps) {
  const resultLabel = `${resultCount.toLocaleString('ko-KR')}개 보기`;

  return (
    <div className="flex items-center justify-between gap-3">
      <SearchBar scopeCount={scopeCount} className="flex-1 lg:max-w-2/5" />
      <FilterSheet resultLabel={resultLabel} filterCounts={filterCounts} />
    </div>
  );
}
