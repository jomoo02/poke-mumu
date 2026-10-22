import { useQueryStates } from 'nuqs';

import { pokeSearchParams } from '../search-params';

const PARSERS = { search: pokeSearchParams.search };

// 검색어 (URL ?search=)
export function usePokeSearch() {
  const [{ search: keyword }, setParams] = useQueryStates(PARSERS);

  const setKeyword = (next: string) => {
    // 같은 검색어를 다시 반영할 때(한글 조합 끝 등)는 URL을 다시 쓰지 않는다
    if (next === keyword) {
      return;
    }

    setParams({ search: next });
  };

  return { keyword, setKeyword };
}
