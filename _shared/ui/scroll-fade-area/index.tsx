'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/_shared/lib/cn';

interface ScrollFadeAreaProps {
  className?: string;
  children: ReactNode;
}

// 세로 스크롤 영역. 위·아래에 가려진 내용이 있으면 그 가장자리에 흐린 그라데이션을 띄운다.
// 그라데이션은 popover 배경색에서 투명으로 가므로 시트·팝오버 안에서 쓴다
export function ScrollFadeArea({ className, children }: ScrollFadeAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ top: false, bottom: false });

  // 스크롤 위치와 내용 크기가 바뀔 때마다 위·아래에 가려진 내용이 있는지 다시 잰다
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      // 소수점 스크롤 값 때문에 1px 여유를 둔다
      const top = el.scrollTop > 1;
      const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
      setEdge((prev) =>
        prev.top === top && prev.bottom === bottom ? prev : { top, bottom },
      );
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);

    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative flex min-h-0 flex-col">
      <div
        ref={ref}
        className={cn('min-h-0 overflow-y-auto no-scrollbar', className)}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-popover to-transparent transition-opacity duration-150',
          edge.top ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-popover to-transparent transition-opacity duration-150',
          edge.bottom ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}
