import { parseAsStringLiteral } from 'nuqs/server';

import { DEFAULT_SORT, SORT_KEYS, SORT_ORDERS } from './sort-abilities';

// 정렬 (?sort=&order=). 기본 정렬(이름순)은 URL에 쓰지 않는다
const sortSearchParams = {
  sort: parseAsStringLiteral(SORT_KEYS).withDefault(DEFAULT_SORT.sort),
  order: parseAsStringLiteral(SORT_ORDERS).withDefault(DEFAULT_SORT.order),
};

export { sortSearchParams };
