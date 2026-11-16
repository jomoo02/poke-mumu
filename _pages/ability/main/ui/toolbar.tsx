import SearchBar from './search-bar';

/**
 * [🔍 특성 검색                    ]
 * 필터가 없어 검색만 (기술 페이지와 같은 폭·높이).
 * 개수는 결과 줄(표 위, 모바일은 개수 · 정렬)에 보인다
 */
export default function Toolbar() {
  return (
    <div className="mb-3">
      <SearchBar />
    </div>
  );
}
