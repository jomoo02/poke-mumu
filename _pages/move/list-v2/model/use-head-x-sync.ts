'use client';

import { useLayoutEffect, type RefObject } from 'react';

// head-sync.module.css의 @supports 조건과 같아야 한다
const supportsScrollTimeline = () =>
  CSS.supports('animation-timeline: scroll()') &&
  CSS.supports('timeline-scope: none');

interface HeadXSyncRefs {
  // --max-x를 둘 공통 부모 (헤더 track이 상속받는다)
  scopeRef: RefObject<HTMLElement | null>;
  // 바디 가로 스크롤 박스
  scrollerRef: RefObject<HTMLElement | null>;
  // 헤더에서 가로로 움직일 칸들
  trackRef: RefObject<HTMLElement | null>;
}

/**
 * 헤더 track을 바디 가로 스크롤에 맞춘다.
 * - 항상: --max-x(= scrollWidth - clientWidth)를 크기가 바뀔 때만 갱신 (scroll마다 계산하지 않는다)
 * - scroll-driven animation 미지원(Firefox 등)일 때만: scroll 이벤트로 translateX(-scrollLeft)
 */
export function useHeadXSync({
  scopeRef,
  scrollerRef,
  trackRef,
}: HeadXSyncRefs) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    const scroller = scrollerRef.current;
    const track = trackRef.current;

    if (!scope || !scroller || !track) {
      return;
    }

    const updateMaxX = () => {
      const maxX = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      scope.style.setProperty('--max-x', `${maxX}px`);
    };

    updateMaxX();

    // 스크롤 박스(clientWidth)와 안쪽 내용(scrollWidth) 둘 다 본다
    const resizeObserver = new ResizeObserver(updateMaxX);
    resizeObserver.observe(scroller);
    if (scroller.firstElementChild) {
      resizeObserver.observe(scroller.firstElementChild);
    }

    if (supportsScrollTimeline()) {
      return () => resizeObserver.disconnect();
    }

    const syncTrack = () => {
      track.style.transform = `translateX(${-scroller.scrollLeft}px)`;
    };

    syncTrack();
    scroller.addEventListener('scroll', syncTrack, { passive: true });

    return () => {
      resizeObserver.disconnect();
      scroller.removeEventListener('scroll', syncTrack);
      track.style.transform = '';
    };
  }, [scopeRef, scrollerRef, trackRef]);
}
