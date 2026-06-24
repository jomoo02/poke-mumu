'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

import { getPageWindow } from '../model/get-page-window';

interface PokePaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// 번호형 페이지네이션(shadcn pagination 미설치 → Button으로 구성).
export default function PokePagination({
  page,
  totalPages,
  onChange,
}: PokePaginationProps) {
  if (totalPages <= 1) return null;

  const window = getPageWindow(page, totalPages);

  return (
    <nav
      aria-label="페이지 이동"
      className="flex items-center justify-center gap-2"
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-10 rounded-lg"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="이전 페이지"
      >
        <ChevronLeftIcon className="size-4.5" />
      </Button>

      {window.map((item, index) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-muted-foreground select-none"
          >
            …
          </span>
        ) : (
          <Button
            key={item}
            type="button"
            variant={item === page ? 'default' : 'outline'}
            size="icon"
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onChange(item)}
            className={cn('tabular-nums', 'size-10 rounded-lg')}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="다음 페이지"
        className="size-10 rounded-lg"
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </nav>
  );
}
