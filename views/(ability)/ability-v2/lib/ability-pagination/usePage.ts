'use client';

import { useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import { useSearchParamsState } from '@/shared/lib/search-params';

/**
 * 'page' 파라미터 상태. 리스트 길이는 모른다(범위 보정은 paginate가 담당).
 * - page: URL의 page 값(음수/0/문자열/소수는 1로).
 * - goToPage: 이동(history push) + 커밋 후 최상단 스크롤.
 *   검색·정렬로 page가 바뀐 경우에는 스크롤하지 않도록 ref 플래그로 구분한다.
 */
export function usePage() {
  const searchParams = useSearchParams();
  const { setParams } = useSearchParamsState();
  const pendingScrollRef = useRef(false);

  const page = Math.trunc(Number(searchParams.get('page'))) || 1;

  const goToPage = (nextPage: number) => {
    pendingScrollRef.current = true;
    setParams(
      { page: nextPage > 1 ? String(nextPage) : null },
      { history: 'push' },
    );
  };

  useLayoutEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    window.scrollTo({ top: 0 });
  }, [page]);

  return { page, goToPage };
}
