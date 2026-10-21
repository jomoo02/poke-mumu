import { useLayoutEffect, useState, type RefObject } from 'react';

// @5xl (64rem = 1024px). 테이블·카드를 나누는 컨테이너 쿼리와 같은 값
const WIDE_MIN_WIDTH = 1024;

/**
 * 요소(@container)의 폭이 @5xl 이상인지. CSS 컨테이너 쿼리와 같은 기준으로 JS에서 그리기 방식을 고를 때 쓴다.
 * 첫 렌더는 false(좁은 본문 = 가상화)로 시작해 행을 적게 그리고, 페인트 전에 실제 폭으로 맞춘다
 * (목록은 브라우저에서만 그려져 서버 HTML과 어긋날 일이 없다)
 */
export function useIsWideContainer(ref: RefObject<HTMLElement | null>) {
  const [isWide, setIsWide] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const read = () => setIsWide(element.clientWidth >= WIDE_MIN_WIDTH);

    read();

    const resizeObserver = new ResizeObserver(read);

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return isWide;
}
