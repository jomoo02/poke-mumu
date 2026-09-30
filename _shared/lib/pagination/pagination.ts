interface PageResult<T> {
  items: T[];
  page: number;
  totalPages: number;
}

/**
 * 페이지 번호를 1 ~ totalPages 범위의 정수로 맞춘다.
 * NaN은 1, 소수는 버림, 범위를 넘으면 가장 가까운 끝 페이지로 보정한다.
 */
const clampPage = (page: number, totalPages: number): number => {
  if (Number.isNaN(page)) {
    return 1;
  }

  return Math.min(Math.max(1, Math.trunc(page)), Math.max(1, totalPages));
};

/**
 * 목록을 페이지 단위로 자른다. searchParams를 모르는 순수 함수.
 * 목록이 비어도 totalPages는 1이다(빈 1페이지).
 */
const paginate = <T>(
  list: readonly T[],
  requestedPage: number,
  pageSize: number,
): PageResult<T> => {
  // 호출부 설정 실수다. 조용히 보정하면 잘못된 페이지 크기가 숨겨지므로 즉시 알린다
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new RangeError(`pageSize must be a positive integer: ${pageSize}`);
  }

  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));

  const page = clampPage(requestedPage, totalPages);

  const start = (page - 1) * pageSize;

  return {
    items: list.slice(start, start + pageSize),
    page,
    totalPages,
  };
};

/**
 * URL의 page 값을 1 이상의 정수로 읽는다.
 * 없음/문자열/0/음수는 1, 소수는 버림. 상한(총 페이지 수) 보정은 paginate가 담당한다.
 */
const parsePage = (raw: string | null): number =>
  Math.max(1, Math.trunc(Number(raw))) || 1;

export type { PageResult };

export { clampPage, paginate, parsePage };
