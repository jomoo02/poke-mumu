'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { Move } from '@/entities/move/model';
import { createSearchMatcher } from '@/shared/lib/search';

import { SEARCH_PARAM_KEYS } from '../../model/search-params';

export const PAGE_SIZE = 30;
const PAGE_KEY = 'page';

export default function useMoveList(moves: Move[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get(SEARCH_PARAM_KEYS.search) ?? '';

  const filteredMoves = useMemo(() => {
    const matchesKeyword = createSearchMatcher(query);

    return moves.filter(({ nameKo, nameEn, nameJa }) =>
      matchesKeyword(nameKo, nameEn, nameJa),
    );
  }, [moves, query]);

  const totalPages = Math.max(1, Math.ceil(filteredMoves.length / PAGE_SIZE));

  // 검색으로 결과 수가 줄어 page 파라미터가 범위를 벗어나도 마지막 페이지로 보정한다.
  const parsedPage = Number.parseInt(searchParams.get(PAGE_KEY) ?? '', 10);
  const currentPage = Number.isNaN(parsedPage)
    ? 1
    : Math.min(Math.max(parsedPage, 1), totalPages);

  const pagedMoves = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredMoves.slice(start, start + PAGE_SIZE);
  }, [filteredMoves, currentPage]);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete(PAGE_KEY);
    } else {
      params.set(PAGE_KEY, String(page));
    }

    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  };

  return { filteredMoves, pagedMoves, currentPage, totalPages, goToPage };
}
