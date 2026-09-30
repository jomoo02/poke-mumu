const SEARCH_PARAMS_KEY = {
  search: 'search',
  type: 'type',
  damageClass: 'damageClass',
  sort: 'sort',
  order: 'order',
  page: 'page',
} as const;

// 검색·필터·정렬이 바뀌면 목록이 달라지므로 함께 지워 1페이지로 되돌린다
const PAGE_RESET_KEYS = [SEARCH_PARAMS_KEY.page];

export { SEARCH_PARAMS_KEY, PAGE_RESET_KEYS };
