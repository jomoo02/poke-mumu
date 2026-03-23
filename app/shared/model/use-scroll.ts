import { useEffect, useRef } from 'react';

export function useScrollXToActive<T extends HTMLElement>(
  activeKey: string | null,
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !activeKey) {
      return;
    }

    const activeEl = container.querySelector<HTMLElement>(
      `[data-key="${activeKey}"]`,
    );

    if (!activeEl) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    const isVisible =
      activeRect.left >= containerRect.left &&
      activeRect.right <= containerRect.right;

    if (isVisible) {
      return;
    }

    const scrollLeft =
      activeEl.offsetLeft -
      container.offsetWidth / 2 +
      activeEl.offsetWidth / 2;

    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, [activeKey]);

  return containerRef;
}
