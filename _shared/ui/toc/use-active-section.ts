'use client';

import * as React from 'react';

import { getActiveSectionId } from './active-section';

// 앵커 이동 후 섹션 top이 이 범위 안이면 도달로 본다
const THRESHOLD = 24;
// scrollend 미지원이거나 스크롤이 일어나지 않을 때 잠금 해제
const LOCK_FALLBACK_MS = 1000;

interface ScrollToSectionOptions {
  // 초기 해시 보정처럼 사용자가 누르지 않은 이동은 애니메이션 없이
  smooth?: boolean;
}

// 앵커 이동 시 섹션이 멈추는 위치 = html scroll-padding-top(sticky 헤더) + 섹션 scroll-margin-top
const readSectionPositions = (ids: string[]) => {
  const scrollPaddingTop =
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
    0;

  return ids.flatMap((id) => {
    const element = document.getElementById(id);

    if (!element) {
      return [];
    }

    const scrollMarginTop =
      parseFloat(getComputedStyle(element).scrollMarginTop) || 0;

    return [
      {
        id,
        top:
          element.getBoundingClientRect().top -
          scrollPaddingTop -
          scrollMarginTop,
      },
    ];
  });
};

const getIsAtBottom = () => {
  const { scrollY, innerHeight } = window;

  // 스크롤이 없는 짧은 페이지는 바닥으로 보지 않는다
  return (
    scrollY > 0 &&
    scrollY + innerHeight >= document.documentElement.scrollHeight - 2
  );
};

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  // 클릭 이동 중에는 스크롤 계산을 멈춰 중간 섹션이 깜빡이지 않게 한다
  const releaseLockRef = React.useRef<(() => void) | null>(null);

  // scroll 이벤트는 브라우저가 프레임당 한 번으로 묶어 보내므로 별도 throttle 불필요
  React.useEffect(() => {
    const update = () => {
      if (releaseLockRef.current) {
        return;
      }

      setActiveId(
        getActiveSectionId(readSectionPositions(ids), {
          threshold: THRESHOLD,
          isAtBottom: getIsAtBottom(),
        }),
      );
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids]);

  React.useEffect(() => () => releaseLockRef.current?.(), []);

  const scrollToSection = React.useCallback(
    (id: string, { smooth = true }: ScrollToSectionOptions = {}) => {
      const element = document.getElementById(id);

      if (!element) {
        return false;
      }

      releaseLockRef.current?.();

      const release = () => {
        window.clearTimeout(timer);
        window.removeEventListener('scrollend', release);
        releaseLockRef.current = null;
      };
      const timer = window.setTimeout(release, LOCK_FALLBACK_MS);
      window.addEventListener('scrollend', release);
      releaseLockRef.current = release;

      setActiveId(id);

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      element.scrollIntoView({
        behavior: smooth && !reduceMotion ? 'smooth' : 'auto',
        block: 'start',
      });

      return true;
    },
    [],
  );

  // 본문이 Suspense로 늦게 도착하면 브라우저의 초기 해시 이동이 대상을 찾지 못한다.
  // 목차가 마운트된 시점에는 같은 컴포넌트에 있는 섹션도 DOM에 있으므로 여기서 한 번 이동한다
  const handledInitialHashRef = React.useRef(false);

  React.useEffect(() => {
    if (handledInitialHashRef.current) {
      return;
    }
    handledInitialHashRef.current = true;

    const id = decodeURIComponent(window.location.hash.slice(1));

    if (ids.includes(id)) {
      scrollToSection(id, { smooth: false });
    }
  }, [ids, scrollToSection]);

  return { activeId, scrollToSection };
}
