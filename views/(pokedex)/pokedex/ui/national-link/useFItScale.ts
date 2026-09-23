import { useEffect, useLayoutEffect, useRef } from 'react';

import { DESIGN_W } from './config';

// // SSR 경고 없이 layout effect
// const useIsoLayoutEffect =
//   typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useFitScale(designW = DESIGN_W) {
  const boxRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const el = scaleRef.current;
    if (!box || !el) return;

    const apply = (w: number) => {
      const scale = Math.min(w / DESIGN_W, 1);
      el.style.setProperty('--graphic-scale', String(scale));
    };

    apply(box.getBoundingClientRect().width);
    box.style.opacity = '1';

    const ro = new ResizeObserver(([e]) => apply(e.contentRect.width));
    ro.observe(box);
    return () => ro.disconnect();
  }, [designW]);

  return { boxRef, scaleRef };
}
