import { useQueryStates } from 'nuqs';

import { parseAsPage } from '@/_shared/lib/pagination';

const pageSearchParams = { page: parseAsPage };

// 현재 페이지 (?page=). 페이지 이동은 링크(PaginationNav)가 URL을 바꾼다
export function usePageParam() {
  const [{ page }] = useQueryStates(pageSearchParams);

  return { page };
}

export { pageSearchParams };
