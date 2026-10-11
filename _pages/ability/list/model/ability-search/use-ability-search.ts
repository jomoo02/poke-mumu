'use client';

import { useQueryStates } from 'nuqs';

import { abilitySearchParams } from '../search-params';

const PARSERS = {
  search: abilitySearchParams.search,
  page: abilitySearchParams.page,
};

// 검색어 (URL ?search=). 바꾸면 목록이 달라지므로 1페이지로
export function useAbilitySearch() {
  const [{ search: keyword }, setParams] = useQueryStates(PARSERS);

  const setKeyword = (next: string) => {
    // 같은 검색어를 다시 반영할 때(조합 끝 등) page를 지우지 않는다
    if (next === keyword) {
      return;
    }

    setParams({ search: next, page: null });
  };

  return { keyword, setKeyword };
}
