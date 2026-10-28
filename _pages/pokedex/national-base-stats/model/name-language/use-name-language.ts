import { useQueryStates } from 'nuqs';

import type { NameLanguage } from './name-language';
import { pokeSearchParams } from '../search-params';

const PARSERS = {
  lang: pokeSearchParams.lang,
  page: pokeSearchParams.page,
};

export function useNameLanguage() {
  const [{ lang: language }, setParams] = useQueryStates(PARSERS);

  // 이름순 정렬·검색 결과가 언어마다 달라 1페이지로 되돌린다. 같은 언어를 다시 고르면 그대로
  const setLanguage = (next: NameLanguage) => {
    if (next === language) {
      return;
    }

    setParams({ lang: next, page: null });
  };

  return { language, setLanguage };
}
