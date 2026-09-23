'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

import { getPageWindow } from '../../model/pagination';
import { EllipsisIcon } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// 번호 버튼(size-10.5 = 42px) + gap-1(4px) = 46px이지만, 빽빽하게 차는 걸 피하려고
// 한 칸을 넉넉히 48px로 잡는다. 실제보다 크게 잡을수록 번호가 덜 노출된다.
const SLOT = 48;
// 화살표는 상위 index가 렌더하므로 이 컨테이너 폭에는 포함되지 않는다.
// 그래도 좌우 화살표에 시각적 여백을 두려고 측정 폭에서 빼둔다.
const ARROW_RESERVE = 52;

// 폭을 측정해 들어가는 만큼 번호를 노출한다(넓으면 전부, 좁으면 ellipsis).
export default function DesktopPagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // 초기값은 "전부 보임"으로 가정한다. SSR/최초 페인트가 전체창을 그려,
  // 넓은 화면에선 측정 후에도 값이 같아 리렌더(깜빡임)가 없다.
  // 폭이 좁을 때만 useLayoutEffect 측정이 한 번 줄인다.
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
    <div
      ref={containerRef}
      className="flex items-center justify-center gap-1 flex-1"
    >
      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <div key={`ellipsis-${index}`} className="px-1">
            <EllipsisIcon className="text-muted-foreground select-none size-4.25" />
          </div>
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
  );
}
