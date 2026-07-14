import { DEFAULT_SORT_DIR, DEFAULT_SORT_KEY, parseSort } from './poke-sort';

// 툴바 초기화 버튼의 활성 판정: 필터(type/form)나 정렬 중 하나라도
// 기본값과 다르면 true. (검색은 입력창의 X가 담당하므로 여기서 제외)
export const isFilterOrSortActive = (params: URLSearchParams): boolean => {
  const { sortKey, sortDir } = parseSort(params);

  return (
    params.getAll('type').filter(Boolean).length > 0 ||
    params.getAll('form').filter(Boolean).length > 0 ||
    sortKey !== DEFAULT_SORT_KEY ||
    sortDir !== DEFAULT_SORT_DIR
  );
};
