import { useQueryStates } from 'nuqs';

import { DEFAULT_NAME_LANGUAGE, useNameLanguage } from './name-language';
import { usePokeFilter, type PokeFilterOptions } from './poke-filter';
import { usePokeSearch } from './poke-search';
import { pokeSearchParams } from './search-params';

const PARSERS = {
  search: pokeSearchParams.search,
  lang: pokeSearchParams.lang,
  type: pokeSearchParams.type,
  form: pokeSearchParams.form,
  gen: pokeSearchParams.gen,
};

/**
 * 검색어·이름 언어·필터를 한 번에 처음으로 (필터 줄의 초기화, 빈 결과의 초기화).
 * 정렬은 결과 줄의 보기 설정이라 두고 (결정 문서 2026-10-23).
 * 언어만 되돌리면 그 언어로 친 검색어가 남아 0건이 되므로 검색어도 함께 지운다
 */
export function useResetConditions(options: PokeFilterOptions) {
  const { keyword } = usePokeSearch();
  const { language } = useNameLanguage();
  const { isActive: isFilterActive } = usePokeFilter(options);

  const [, setParams] = useQueryStates(PARSERS);

  const isActive =
    keyword !== '' || language !== DEFAULT_NAME_LANGUAGE || isFilterActive;

  const reset = () => {
    // 이미 처음 상태면 URL을 다시 쓰지 않는다
    if (!isActive) {
      return;
    }

    setParams({
      search: null,
      lang: null,
      type: null,
      form: null,
      gen: null,
    });
  };

  return { isActive, reset };
}
