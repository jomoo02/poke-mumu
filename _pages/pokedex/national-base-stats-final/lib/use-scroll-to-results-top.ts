'use client';

import { useLayoutEffect, useRef, type RefObject } from 'react';

/**
 * 검색·필터·정렬·페이지로 목록이 바뀌면 결과 위(사이트 헤더 아래)로 올린다.
 * 이미 그보다 위에 있으면(툴바를 보고 있으면) 그대로 둔다.
 * 사이트 헤더 높이는 결과 영역의 scroll-margin-top(= --header-height)에서 읽는다
 * (머리글이 sticky가 아닐 때도 같은 값을 쓰도록 머리글의 top 대신)
 */
export function useScrollToResultsTop<T>(
  rows: T,
  scopeRef: RefObject<HTMLElement | null>,
) {
  const prevRowsRef = useRef(rows);

  useLayoutEffect(() => {
    if (prevRowsRef.current === rows) {
      return;
    }
    prevRowsRef.current = rows;

    const scope = scopeRef.current;
    if (!scope) {
      return;
    }

    const headerHeight =
      parseFloat(getComputedStyle(scope).scrollMarginTop) || 0;
    const tableTop =
      scope.getBoundingClientRect().top + window.scrollY - headerHeight;

    if (window.scrollY > tableTop) {
      window.scrollTo({ top: tableTop });
    }
  }, [rows, scopeRef]);
}
