'use client';

import { useLayoutEffect, useRef } from 'react';

import { useSearchParamsState } from '../search-params';

// 페이지 이동 + 페이지 커밋 후 최상단 스크롤.
// 페이지네이션 클릭일 때만 스크롤이 걸리도록 ref 플래그로 구분한다.
export function useGoToPage(page: number) {
  const { setParams } = useSearchParamsState();
  const pendingScrollRef = useRef(false);

  const goToPage = (nextPage: number) => {
    pendingScrollRef.current = true;
    setParams(
      { page: nextPage > 1 ? String(nextPage) : null },
      { keepPage: true, history: 'push' },
    );
  };

  useLayoutEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    window.scrollTo({ top: 0 });
  }, [page]);

  return goToPage;
}
