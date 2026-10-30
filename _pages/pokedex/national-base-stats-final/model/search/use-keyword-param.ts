import { useListQueryStates } from '../url-state';
import { keywordSearchParams } from './keyword-search-params';

// 검색어 (?search=)
export function useKeywordParam() {
  const [{ search: keyword }, write] = useListQueryStates(keywordSearchParams);

  // 한글 조합 끝처럼 같은 검색어를 다시 반영할 때는 쓰지 않는다
  const setKeyword = (next: string) => {
    if (next === keyword) {
      return;
    }

    write({ search: next });
  };

  // 빈 결과의 '검색어 지우기'
  const clearKeyword = () => setKeyword('');

  return { keyword, setKeyword, clearKeyword };
}
