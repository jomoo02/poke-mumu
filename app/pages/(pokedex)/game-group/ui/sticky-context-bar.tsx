'use client';

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type RefObject,
} from 'react';

import { cn } from '@/app/shared/lib/cn';
import { ChevronRight, ChevronRightIcon } from 'lucide-react';

interface StickyContextBarProps {
  title: string;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function StickyContextBar({
  title,
  containerRef,
}: StickyContextBarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeRange, setActiveRange] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const updateActiveSection = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const h2s = container.querySelectorAll<HTMLElement>('[data-dex-h2]');
    if (h2s.length === 0) return;

    const barBottom = barRef.current?.getBoundingClientRect().bottom ?? 0;
    let active: string | null = null;
    let range: string | null = null;

    h2s.forEach((h2) => {
      const rect = h2.getBoundingClientRect();
      if (rect.top < barBottom + 10) {
        active = h2.getAttribute('data-dex-h2');
        range = h2.getAttribute('data-dex-range');
      }
    });

    setActiveSection(active);
    setActiveRange(range);
  }, [containerRef]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener('scroll', onScroll);
  }, [updateActiveSection]);

  const showBar = activeSection !== null;

  return (
    <div
      ref={barRef}
      className={cn(
        'sticky top-14 z-20 -mx-4 sm:-mx-6 xl:mx-0 px-4 sm:px-6 overflow-hidden',
        showBar
          ? 'h-10 opacity-100 border-b bg-background'
          : 'h-0 opacity-0 pointer-events-none',
      )}
    >
      <div className="flex items-center justify-between h-10 max-w-7xl mx-auto w-full">
        <p className="text-sm truncate min-w-0 flex items-center">
          <span>{title}</span>
          {activeSection && (
            <>
              <ChevronRightIcon className="size-4 inline-flex text-muted-foreground mx-1" />
              <span>{activeSection}</span>
            </>
          )}
          {activeRange && (
            <span className="text-muted-foreground ml-1.5">{activeRange}</span>
          )}
        </p>
      </div>
    </div>
  );
}
