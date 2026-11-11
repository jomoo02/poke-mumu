import ResultCount from './result-count';
import SearchBar from './search-bar';

interface ToolbarProps {
  // 지금 결과 수 (lg 이상 줄 끝 개수)
  resultCount: number;
}

/**
 * [검색]
 *                                   특성
 *                                   N개   ← lg 이상: 전국도감 종족값과 같은 h-16 줄 끝
 * 필터가 없어 lg 미만은 검색만 두고, 개수는 결과 줄(개수 · 정렬)에 보인다
 */
export default function Toolbar({ resultCount }: ToolbarProps) {
  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="hidden h-16 items-center justify-end lg:flex">
        <ResultCount stacked count={resultCount} />
      </div>
    </div>
  );
}
