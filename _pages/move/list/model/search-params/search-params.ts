import { parseAsString, parseAsStringLiteral } from 'nuqs/server';

import { parseAsFacets } from '@/_shared/lib/facet-param';
import { parseAsPage } from '@/_shared/lib/pagination';

import { DEFAULT_SORT, SORT_KEYS, SORT_ORDERS } from '../move-sort/move-sort';

/**
 * 기술 목록의 URL 상태 정의. 객체 키가 곧 URL 키다.
 * 잘못된 값은 기본값으로 읽고, 기본값은 URL에 쓰지 않는다(nuqs clearOnDefault).
 * 각 훅은 필요한 키만 골라 useQueryStates로 쓰고,
 * 목록이 달라지는 변경(검색·필터·정렬)은 page: null로 1페이지로 되돌린다
 */
const moveSearchParams = {
  search: parseAsString.withDefault(''),
  // ?filter=type.fire_damageClass.physical (고른 순서)
  filter: parseAsFacets,
  sort: parseAsStringLiteral(SORT_KEYS).withDefault(DEFAULT_SORT.sort),
  order: parseAsStringLiteral(SORT_ORDERS).withDefault(DEFAULT_SORT.order),
  page: parseAsPage,
};

export { moveSearchParams };
