'use client';

import { useEffect, type RefObject } from 'react';

interface ScrollIntoViewOnResizeOptions {
  /** 관찰할 대상을 고르는 CSS 셀렉터. 기본 'button'. */
  selector?: string;
  /** false면 관찰하지 않음(예: 데스크톱에서 끄기). 기본 true. */
  enabled?: boolean;
  /** 가로축(x) 정렬. 기본 'nearest'(잘렸을 때만 최소 이동). */
  inline?: ScrollLogicalPosition;
  /** 세로축(y) 정렬. 기본 'nearest'. */
  block?: ScrollLogicalPosition;
  /** 스크롤 애니메이션. 기본 'auto'(즉시). */
  behavior?: ScrollBehavior;
}

/**
 * 컨테이너 안에서 selector에 매칭되는 요소들의 크기 변화를 관찰해,
 * 크기가 바뀐 요소를 컨테이너 안에서 보이도록 스크롤한다.
 *
 * 용도: 스크롤 트리거의 텍스트가 길어져 너비가 커지면 잘리는 문제 대응 —
 * 너비가 확정되는 시점(선택 반영 등)에 해당 요소를 다시 보이게 맞춘다.
 */
export function useScrollIntoViewOnResize(
  containerRef: RefObject<HTMLElement | null>,
  {
    selector = 'button',
    enabled = true,
    inline = 'nearest',
    block = 'nearest',
    behavior = 'auto',
  }: ScrollIntoViewOnResizeOptions = {},
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container || typeof ResizeObserver === 'undefined') return;

    // 관찰 시작 시 요소마다 1회 발화되는 초기 콜백은 스킵(로드 시 스크롤 방지).
    const seen = new WeakSet<Element>();
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (!seen.has(entry.target)) {
          seen.add(entry.target);
          continue;
        }
        entry.target.scrollIntoView({ inline, block, behavior });
      }
    });

    container.querySelectorAll(selector).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef, selector, enabled, inline, block, behavior]);
}
