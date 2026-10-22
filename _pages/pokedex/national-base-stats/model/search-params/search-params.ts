import { parseAsString, parseAsStringLiteral } from 'nuqs/server';

import { parseAsFacets } from '@/_shared/lib/facet-param';

// index가 아닌 파일에서 직접: 각 index가 내보내는 훅(usePokeSort·useNameLanguage)이 이 파일을 import해 순환이 생긴다
import { DEFAULT_SORT, SORT_KEYS, SORT_ORDERS } from '../poke-sort/poke-sort';
import {
  DEFAULT_NAME_LANGUAGE,
  NAME_LANGUAGES,
} from '../name-language/name-language';

/**
 * 전국도감(종족값)의 URL 상태 정의. 객체 키가 곧 URL 키다.
 * 잘못된 값은 기본값으로 읽고, 기본값은 URL에 쓰지 않는다(nuqs clearOnDefault).
 * 각 훅은 필요한 키만 골라 useQueryStates로 쓴다
 */
const pokeSearchParams = {
  search: parseAsString.withDefault(''),
  filter: parseAsFacets,
  sort: parseAsStringLiteral(SORT_KEYS).withDefault(DEFAULT_SORT.sort),
  order: parseAsStringLiteral(SORT_ORDERS).withDefault(DEFAULT_SORT.order),
  lang: parseAsStringLiteral(NAME_LANGUAGES).withDefault(DEFAULT_NAME_LANGUAGE),
};

export { pokeSearchParams };
