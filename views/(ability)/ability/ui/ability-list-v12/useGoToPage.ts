'use client';

import { useLayoutEffect, useRef } from 'react';

import { useSearchParamsState } from '@/shared/lib/search-params';

/**
 * 페이지 이동(history push) + 새 페이지 커밋 후 최상단 스크롤.
 * 검색·정렬로 page가 바뀐 경우에는 스크롤하지 않도록 ref 플래그로 구분한다.
 */
export default function useGoToPage(page: number) {
  const { setParams } = useSearchParamsState();
  const pendingScrollRef = useRef(false);

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

  return goToPage;
}
