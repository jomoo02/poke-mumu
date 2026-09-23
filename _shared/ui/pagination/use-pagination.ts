'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { getPaginationItems } from './pagination-item';
import { buildPageHref } from './page-href';

interface UsePaginationParams {
  page: number;
  totalPages: number;
  paramName?: string;
}

export function usePagination({
  page,
  totalPages,
  paramName = 'page',
}: UsePaginationParams) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const items = getPaginationItems(page, totalPages);

  const createHref = useCallback(
    (targetPage: number) =>
      buildPageHref(pathname, searchParams, targetPage, totalPages, paramName),
    [pathname, searchParams, totalPages, paramName],
  );

  return { items, createHref };
}
