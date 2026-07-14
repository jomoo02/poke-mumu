'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import { getPageWindow } from '../../model/pagination';
import { cn } from '@/shared/lib/cn';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const SLOT = 50; // 번호 버튼(size-11 ≈ 44px) + gap(6px)
const ARROW_RESERVE = 200; // 이전/다음 버튼 영역 예약

// 폭을 측정해 들어가는 만큼 번호를 노출한다(넓으면 전부, 좁으면 ellipsis).
export default function DesktopPagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [capacity, setCapacity] = useState(7);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const measure = () => {
      const available = el.clientWidth - ARROW_RESERVE;
      const fitsAll = totalPages * SLOT <= available;
      setCapacity(
        fitsAll ? totalPages : Math.max(3, Math.floor(available / SLOT)),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [totalPages]);

  const items = getPageWindow(page, totalPages, capacity);

  return (
    <div ref={containerRef} className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={cn(
          'h-10.5 pl-3 pr-4.5 shrink-0 cursor-pointer',
          ' bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
        )}
      >
        <ChevronLeftIcon className="size-4.5" />
        이전
      </Button>

      <div className="flex items-center justify-center gap-1.5 flex-1">
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-muted-foreground select-none"
            >
              …
            </span>
          ) : (
            <Button
              key={item}
              type="button"
              variant={'ghost'}
              disabled={item === page}
              size="icon"
              aria-current={item === page ? 'page' : undefined}
              onClick={() => onChange(item)}
              className={cn(
                'tabular-nums size-10.5 rounded-4xl transition-none shrink-0 cursor-pointer',
                'hover:bg-input/30 dark:hover:bg-input/50 disabled:opacity-100',
                item === page
                  ? 'bg-input/50 dark:bg-input/70 hover:bg-input/50 dark:hover:bg-input/70'
                  : '',
              )}
            >
              {item}
            </Button>
          ),
        )}
      </div>

      <Button
        variant="ghost"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={cn(
          'h-10.5 pl-4.5 pr-3 shrink-0 cursor-pointer',
          'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
        )}
      >
        다음
        <ChevronRightIcon className="size-4.5" />
      </Button>
    </div>
  );
}
