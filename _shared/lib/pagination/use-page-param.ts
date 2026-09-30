'use client';

import { useSearchParams } from 'next/navigation';

import { parsePage } from './pagination';

// URL에서 현재 페이지 번호를 읽는다. 쓰기(링크 생성)는 ui/pagination의 usePagination이 맡는다
export function usePageParam(key = 'page') {
  const searchParams = useSearchParams();

  const page = parsePage(searchParams.get(key));

  return { page };
}
