import ResultCount from './result-count';
import SearchBar from './search-bar';

interface ToolbarProps {
  // 지금 결과 수 (lg 이상 검색 줄 끝)
  resultCount: number;
}

/**
 * [🔍 검색            ] ……………… N개   ← lg 이상: 한 줄
 * 필터가 없어 필터 트리거 자리를 개수가 차지한다.
 * lg 미만은 검색만 두고, 개수는 결과 줄(개수 · 정렬)에 보인다
 */
export default function Toolbar({ resultCount }: ToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <SearchBar className="flex-1" />
      <ResultCount className="hidden lg:block" count={resultCount} />
    </div>
  );
}
