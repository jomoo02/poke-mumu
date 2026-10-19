'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

// 서버·첫 렌더에서 그릴 화면 높이 (hydration 전에도 첫 화면 항목이 보이게)
const INITIAL_RECT = { width: 0, height: 1000 };

// 기본값은 클라이언트에서 window.scrollY라, 스크롤된 채로 새로고침하면 서버(맨 위)와 다른 항목을 그려
// hydration이 어긋난다. 첫 렌더는 서버와 같게 0으로 두고, 마운트 후 실제 위치로 다시 그린다
const INITIAL_OFFSET = 0;

interface WindowVirtualListOptions {
  count: number;
  // 그리기 전 항목 높이 추정값. 그린 뒤엔 measureElement로 잰 실제 높이를 쓴다
  estimateSize: (index: number) => number;
  // 정렬로 순서가 바뀌어도 잰 높이·요소가 항목을 따라가게 (useCallback으로 안정화해 넘긴다)
  getItemKey: (index: number) => string | number;
  overscan?: number;
}

/**
 * 페이지(window) 스크롤로 움직이는 긴 목록의 가상화. 화면 근처 항목만 그린다.
 * - listRef: 항목들을 담는 요소. 높이 getTotalSize(), position: relative
 * - 항목: data-index + ref={virtualizer.measureElement}, absolute + translateY(start - scrollMargin)
 * 목록 위쪽(툴바 등) 높이가 바뀌면 목록의 문서 기준 위치(scrollMargin)를 다시 잰다
 */
export function useWindowVirtualList<T extends HTMLElement>({
  count,
  estimateSize,
  getItemKey,
  overscan = 6,
}: WindowVirtualListOptions) {
  const listRef = useRef<T>(null);

  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const update = () =>
      setScrollMargin(list.getBoundingClientRect().top + window.scrollY);

    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  const virtualizer = useWindowVirtualizer({
    count,
    estimateSize,
    getItemKey,
    overscan,
    scrollMargin,
    initialRect: INITIAL_RECT,
    initialOffset: INITIAL_OFFSET,
  });

  return { listRef, virtualizer, scrollMargin };
}
