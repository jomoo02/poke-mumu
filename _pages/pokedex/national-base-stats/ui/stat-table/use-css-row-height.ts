'use client';

import { useLayoutEffect, useState, type RefObject } from 'react';

/**
 * 요소에 걸린 CSS 변수 --row-h(px)를 읽는다.
 * 행 높이가 본문 폭(컨테이너 쿼리)에 따라 CSS에서 바뀌므로, 화면 폭(matchMedia) 대신 실제 값을 읽어
 * 가상화가 보이는 범위를 고를 때 쓴다. 요소 크기가 바뀔 때마다 다시 읽는다
 */
export function useCssRowHeight(
  ref: RefObject<HTMLElement | null>,
  // 서버·첫 렌더 값 (좁은 화면 기준)
  initial: number,
) {
  const [rowHeight, setRowHeight] = useState(initial);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const read = () => {
      const value = parseFloat(
        getComputedStyle(element).getPropertyValue('--row-h'),
      );
      if (value > 0) {
        setRowHeight(value);
      }
    };

    read();
    const resizeObserver = new ResizeObserver(read);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return rowHeight;
}
