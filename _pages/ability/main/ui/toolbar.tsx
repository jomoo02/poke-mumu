import SearchBar from './search-bar';

interface ToolbarProps {
  // 검색할 범위의 수 (검색창 안내)
  scopeCount: number;
}

/**
 * [🔍 특성 314개 중 검색 ]
 * 필터가 없어 검색만. 개수는 검색창 안내(검색할 범위)에 보인다 (기술 페이지와 같은 규칙)
 */
export default function Toolbar({ scopeCount }: ToolbarProps) {
  return <SearchBar scopeCount={scopeCount} className="flex-1" />;
}
