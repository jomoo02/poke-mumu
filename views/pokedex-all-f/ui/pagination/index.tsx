'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import { getPageWindow } from '../../model/pagination';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// 이전/다음 화살표 + 번호형 페이지네이션.
// 데스크톱(md+): 한 줄 [‹] 번호창 [›].
// 모바일(<md): 화살표를 상단 행에, 번호창을 아래 행에 분리(버튼 크기·번호 수 유지).
export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageWindow = getPageWindow(page, totalPages);

  const arrowButton = (direction: 'prev' | 'next') => {
    const isPrev = direction === 'prev';
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={isPrev ? '이전 페이지' : '다음 페이지'}
        disabled={isPrev ? page <= 1 : page >= totalPages}
        onClick={() => onChange(isPrev ? page - 1 : page + 1)}
        className="size-10 rounded-4xl shrink-0"
      >
        {isPrev ? (
          <ChevronLeftIcon className="size-4.5" />
        ) : (
          <ChevronRightIcon className="size-4.5" />
        )}
      </Button>
    );
  };

  return (
    <nav
      aria-label="페이지 이동"
      className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-2"
    >
      {/* 모바일: 상단 화살표 행 (양 끝) */}
      <div className="flex w-full justify-between md:hidden">
        {arrowButton('prev')}
        {arrowButton('next')}
      </div>

      {/* 데스크톱: 왼쪽 화살표 */}
      <div className="hidden md:flex">{arrowButton('prev')}</div>

      {/* 번호창 (공통) */}
      <div className="flex items-center justify-center gap-2">
        {pageWindow.map((item, index) =>
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
              variant={item === page ? 'default' : 'outline'}
              size="icon"
              aria-current={item === page ? 'page' : undefined}
              onClick={() => onChange(item)}
              className="tabular-nums size-10 rounded-4xl"
            >
              {item}
            </Button>
          ),
        )}
      </div>

      {/* 데스크톱: 오른쪽 화살표 */}
      <div className="hidden md:flex">{arrowButton('next')}</div>
    </nav>
  );
}
