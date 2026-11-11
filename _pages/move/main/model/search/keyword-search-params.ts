import { parseAsString } from 'nuqs/server';

// 검색어 (?search=)
const keywordSearchParams = {
  search: parseAsString.withDefault(''),
};

export { keywordSearchParams };
