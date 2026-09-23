export const PAGE_SIZE = 100;

export interface PageResult<T> {
  items: T[];
  // 범위 보정된(clamp) 현재 페이지
  page: number;
  totalPages: number;
}

/**
 * 리스트를 페이지 단위로 자른다.
 * 순수 함수: searchParams를 모르고, requestedPage가 범위를 벗어나면 1~totalPages로 보정한다.
 */
export function paginate<T>(
  list: T[],
  requestedPage: number,
  pageSize: number = PAGE_SIZE,
): PageResult<T> {
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const start = (page - 1) * pageSize;

  return {
    items: list.slice(start, start + pageSize),
    page,
    totalPages,
  };
}
