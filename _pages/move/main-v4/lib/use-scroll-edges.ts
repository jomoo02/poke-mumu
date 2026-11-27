import { useEffect, useState, type RefObject } from 'react';

import { cn } from '@/_shared/lib/cn';

// 가로 스크롤 영역의 양 끝에 가려진 내용이 있는지
export interface ScrollEdges {
  start: boolean;
  end: boolean;
}

const NO_EDGES: ScrollEdges = { start: false, end: false };

// 소수점 폭 오차로 끝까지 가도 1px 남는 경우를 넘침으로 보지 않는다
const EDGE_TOLERANCE = 1;

/**
 * 가로 스크롤 요소의 왼쪽·오른쪽에 가려진 내용이 있는지 (넘친 쪽 가장자리 흐림에 쓴다).
 * 스크롤 · 크기 변화(회전 포함) · 자식 추가/삭제(칩 수 변화) 때 다시 잰다.
 * 첫 렌더는 둘 다 false라 서버 HTML과 같다 (흐림은 hydration 뒤에 생긴다)
 */
export function useScrollEdges(
  ref: RefObject<HTMLElement | null>,
): ScrollEdges {
  const [edges, setEdges] = useState<ScrollEdges>(NO_EDGES);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const update = () => {
      const { scrollLeft, clientWidth, scrollWidth } = element;
      const start = scrollLeft > EDGE_TOLERANCE;
      const end = scrollLeft + clientWidth < scrollWidth - EDGE_TOLERANCE;

      // 바뀔 때만 다시 그린다 (스크롤마다 렌더하지 않게)
      setEdges((prev) =>
        prev.start === start && prev.end === end ? prev : { start, end },
      );
    };

    update();

    element.addEventListener('scroll', update, { passive: true });

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);

    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(element, { childList: true });

    return () => {
      element.removeEventListener('scroll', update);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [ref]);

  return edges;
}

// useScrollEdges와 함께 쓰는 넘친 쪽 끝 흐림: 요소의 data-fade-start/end에 따라 왼쪽·오른쪽 흐림 길이 0 ↔ 24px
export const SCROLL_FADE_CLASS_NAME = cn(
  '[--fade-end:0px] [--fade-start:0px] data-fade-end:[--fade-end:24px] data-fade-start:[--fade-start:24px] mask-[linear-gradient(to_right,transparent,#000_var(--fade-start),#000_calc(100%-var(--fade-end)),transparent)]',
);
