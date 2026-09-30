'use client';

import { Fragment } from 'react';

import { cn } from '@/_shared/lib/cn';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import { isEllipsis } from './pagination-item';
import { usePagination } from './use-pagination';

interface PaginationNavProps {
  page: number;
  totalPages: number;
  // 페이지 번호를 담는 URL 파라미터 이름
  paramName?: string;
  className?: string;
}

const ICON_BUTTON_CLASS_NAME = 'size-10 pr-0! pl-0! gap-0';

// 번호 목록 + 이전/다음. sm 미만은 이전/다음을 번호 위 별도 줄로 분리한다
function PaginationNav({
  page,
  totalPages,
  paramName = 'page',
  className,
}: PaginationNavProps) {
  const { items, createHref } = usePagination({
    page,
    totalPages,
    paramName,
  });

  const isFirst = page <= 1;
  const isLast = page >= totalPages;
  const prevHref = createHref(page - 1);
  const nextHref = createHref(page + 1);

  return (
    <Pagination
      className={cn('flex-col items-center sm:flex-row gap-2', className)}
    >
      <PaginationContent className="gap-1 sm:hidden">
        <PaginationItem>
          <PaginationPrevious
            href={prevHref}
            text="이전"
            aria-disabled={isFirst}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={nextHref} text="다음" aria-disabled={isLast} />
        </PaginationItem>
      </PaginationContent>
      <PaginationContent>
        <PaginationItem className="hidden sm:block">
          <PaginationPrevious
            href={prevHref}
            text=""
            aria-disabled={isFirst}
            className={ICON_BUTTON_CLASS_NAME}
          />
        </PaginationItem>
        {items.map((item) => (
          <Fragment key={item}>
            {isEllipsis(item) ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationLink
                  href={createHref(item)}
                  className="size-10"
                  isActive={item === page}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            )}
          </Fragment>
        ))}
        <PaginationItem className="hidden sm:block">
          <PaginationNext
            href={nextHref}
            text=""
            aria-disabled={isLast}
            className={ICON_BUTTON_CLASS_NAME}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { PaginationNav };
