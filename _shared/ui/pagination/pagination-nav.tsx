'use client';

import { Fragment, type ReactNode } from 'react';

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
  // 페이지네이션 옆 요약 (예: 'N개 중 a–b'). 이동 수단이 아니라 <nav> 밖에 둔다
  summary?: ReactNode;
  className?: string;
}

const ICON_BUTTON_CLASS_NAME = 'size-10 pr-0! pl-0! gap-0';

/**
 * 번호 목록 + 이전/다음. sm 미만은 이전/다음을 번호 위 별도 줄로 분리한다
 * summary를 주면 배치를 함께 잡는다 (번호는 늘 가운데). 경계는 md: sm 폭에선 양옆 칸이 좁아 summary가 줄바꿈된다
 *   md 이상  summary ········ ‹ 1 2 3 … › ········ (빈 칸)      1fr | auto | 1fr
 *   md 미만  summary ························· [이전][다음]
 *                          1 2 3 … 10
 * summary와 <nav>를 한 격자에 겹쳐 놓는다: md 미만은 <nav>가 두 줄을 차지하고, 첫 줄의 빈 왼쪽에 summary가 놓인다
 */
function PaginationNav({
  page,
  totalPages,
  paramName = 'page',
  summary,
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

  const hasSummary = summary !== undefined;
  // 이전/다음 줄(글자)과 번호 양옆 아이콘이 바뀌는 경계: 기본 sm, summary가 있으면 md
  const textPrevNextClassName = hasSummary ? 'self-end md:hidden' : 'sm:hidden';
  const iconPrevNextClassName = hasSummary
    ? 'hidden md:block'
    : 'hidden sm:block';

  const prevNext = (
    <PaginationContent className={cn('gap-1', textPrevNextClassName)}>
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
  );

  const pages = (
    <PaginationContent>
      <PaginationItem className={iconPrevNextClassName}>
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
      <PaginationItem className={iconPrevNextClassName}>
        <PaginationNext
          href={nextHref}
          text=""
          aria-disabled={isLast}
          className={ICON_BUTTON_CLASS_NAME}
        />
      </PaginationItem>
    </PaginationContent>
  );

  if (!hasSummary) {
    return (
      <Pagination
        className={cn('flex-col items-center sm:flex-row gap-2', className)}
      >
        {prevNext}
        {pages}
      </Pagination>
    );
  }

  // md 미만: 첫 줄 높이 40 = 이전/다음 버튼 높이 (summary를 그 줄 가운데에 맞춘다). 줄 사이 12 = <nav> 안 간격과 같게
  return (
    <div
      className={cn(
        'grid grid-cols-[1fr_auto] grid-rows-[2.5rem_auto] items-center gap-y-3',
        'md:grid-cols-[1fr_auto_1fr] md:grid-rows-1',
        className,
      )}
    >
      <div className="col-start-1 row-start-1 min-w-0">{summary}</div>
      <Pagination
        className={cn(
          'col-span-2 col-start-1 row-span-2 row-start-1 mx-0 w-auto flex-col items-center gap-3',
          'md:col-span-1 md:col-start-2 md:row-span-1 md:flex-row',
        )}
      >
        {prevNext}
        {pages}
      </Pagination>
    </div>
  );
}

export { PaginationNav };
