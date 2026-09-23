'use client';

import { useSearchParams } from 'next/navigation';

import { SEARCH_PARAMS_KEY } from '../config/search-params';

/**
 * URL의 page 값을 1 이상의 정수로 읽는다.
 * 없음/문자열/0/음수는 1, 소수는 버림. 상한(총 페이지 수) 보정은 paginate가 담당한다.
 */
const parsePage = (raw: string | null): number =>
  Math.max(1, Math.trunc(Number(raw))) || 1;

export function usePage() {
  const searchParams = useSearchParams();

  const page = parsePage(searchParams.get(SEARCH_PARAMS_KEY.page));

  return { page };
}

export { parsePage };
