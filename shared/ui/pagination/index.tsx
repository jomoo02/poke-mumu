// app/shared/ui/pagination.tsx
'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

type PageItem = number | 'ellipsis-left' | 'ellipsis-right';

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
): PageItem[] {
  // 전체 7페이지 이하 → 전부 표시
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const showLeftEllipsis = currentPage > 4;
  const showRightEllipsis = currentPage < totalPages - 3;

  // 시작 근처: 1 ~ max(현재+2, 5), …, last
  if (!showLeftEllipsis && showRightEllipsis) {
    const end = Math.max(currentPage + 2, 5);
    const head = Array.from({ length: end }, (_, i) => i + 1);
    return [...head, 'ellipsis-right', totalPages];
  }

  // 끝 근처: 1, …, min(현재-2, last-4) ~ last (시작 근처와 대칭)
  if (showLeftEllipsis && !showRightEllipsis) {
    const start = Math.min(currentPage - 2, totalPages - 4);
    const tail = Array.from(
      { length: totalPages - start + 1 },
      (_, i) => start + i,
    );
    return [1, 'ellipsis-left', ...tail];
  }

  // 가운데: 1, …, 현재±2, …, last
  return [
    1,
    'ellipsis-left',
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    'ellipsis-right',
    totalPages,
  ];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPaginationRange(currentPage, totalPages);

  const goTo = (page: number) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    if (next !== currentPage) onPageChange(next);
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      {/* <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
        className={cn(
          'inline-flex size-9 items-center justify-center rounded-md border border-border',
          'text-muted-foreground ',
          'hover:bg-accent hover:text-accent-foreground',
          'disabled:pointer-events-none disabled:opacity-40',
        )}
      >
        <ChevronLeft className="size-4" />
      </button> */}

      {items.map((item, index) => {
        if (item === 'ellipsis-left' || item === 'ellipsis-right') {
          return (
            <span
              key={`${item}-${index}`}
              aria-hidden
              className="inline-flex size-9 items-center justify-center text-muted-foreground"
            >
              <MoreHorizontal className="size-4" />
            </span>
          );
        }

        const isActive = item === currentPage;
        return (
          <button
            key={item}
            type="button"
            onClick={() => goTo(item)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex size-9 items-center justify-center rounded-md border text-sm font-medium ',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            {item}
          </button>
        );
      })}

      {/* <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
        className={cn(
          'inline-flex size-9 items-center justify-center rounded-md border border-border',
          'text-muted-foreground ',
          'hover:bg-accent hover:text-accent-foreground',
          'disabled:pointer-events-none disabled:opacity-40',
        )}
      >
        <ChevronRight className="size-4" />
      </button> */}
    </nav>
  );
}
