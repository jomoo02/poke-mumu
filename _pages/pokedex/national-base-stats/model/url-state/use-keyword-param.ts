import { useListParams } from './use-list-params';

// 검색어 (?search=)
export function useKeywordParam() {
  const { params, writeList } = useListParams();

  const keyword = params.search;

  // 한글 조합 끝처럼 같은 검색어를 다시 반영할 때는 쓰지 않는다
  const setKeyword = (next: string) => {
    if (next === keyword) {
      return;
    }

    writeList({ search: next });
  };

  return { keyword, setKeyword };
}
