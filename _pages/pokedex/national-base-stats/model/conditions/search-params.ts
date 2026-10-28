import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

import { parseAsPage } from '@/_shared/lib/pagination';

import { DEFAULT_SORT, SORT_KEYS, SORT_ORDERS } from '../sort';
import { DEFAULT_NAME_LANGUAGE, NAME_LANGUAGES } from '../name-language';

/**
 * 전국도감(종족값)의 URL 상태 정의. 객체 키가 곧 URL 키다.
 * 잘못된 값은 기본값으로 읽고, 기본값은 URL에 쓰지 않는다(nuqs clearOnDefault).
 * 읽기·쓰기는 useConditions 한 곳에서 한다 (목록이 달라지는 변경은 page: null로 1페이지로)
 */
const pokeSearchParams = {
  search: parseAsString.withDefault(''),
  // 필터: 그룹마다 키, 값은 ','로 (?type=fire,flying&form=alola&gen=1). 키 이름 = POKE_FILTER_GROUPS.
  // 값 하나인 키라 바꿔도 제자리를 지켜, 키 순서는 그 그룹을 처음 고른 순서, 키 안은 고른 순서다
  // (반복 키 parseAsNativeArrayOf는 바꿀 때마다 키가 URL 끝으로 옮겨진다)
  type: parseAsArrayOf(parseAsString).withDefault([]),
  form: parseAsArrayOf(parseAsString).withDefault([]),
  gen: parseAsArrayOf(parseAsString).withDefault([]),
  sort: parseAsStringLiteral(SORT_KEYS).withDefault(DEFAULT_SORT.sort),
  order: parseAsStringLiteral(SORT_ORDERS).withDefault(DEFAULT_SORT.order),
  lang: parseAsStringLiteral(NAME_LANGUAGES).withDefault(DEFAULT_NAME_LANGUAGE),
  page: parseAsPage,
};

export { pokeSearchParams };
