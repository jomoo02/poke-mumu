import { RefObject, useEffect } from 'react';

export default function useActiveScroll({
  activeIndex,
  listContainerRef,
  itemRefs,
  lastInputRef,
}: {
  activeIndex: number;
  listContainerRef: RefObject<HTMLDivElement | null>;
  itemRefs: RefObject<(HTMLElement | null)[]>;
  lastInputRef: RefObject<'keyboard' | 'mouse'>;
}) {
  useEffect(() => {
    const lastInput = lastInputRef.current;
    if (lastInput === 'mouse') {
      return;
    }
    const container = listContainerRef.current;

    const el = itemRefs.current[activeIndex];

    if (!container || !el) {
      return;
    }

    if (activeIndex <= 0) {
      container.scrollTop = 0;
    }

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight - 24;

    const elTop = el.offsetTop - 72;
    const elBottom = elTop + el.offsetHeight;

    if (elTop < containerTop) {
      container.scrollTop = elTop - 24;
    }

    if (elBottom > containerBottom) {
      container.scrollTop = elBottom - (container.clientHeight - 24);
    }
  }, [activeIndex, itemRefs, lastInputRef, listContainerRef]);
}
