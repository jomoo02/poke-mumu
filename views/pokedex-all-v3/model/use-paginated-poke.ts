'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { type NationalPoke } from '.';
import { applyFilterSort } from './apply-filter-sort';

export const PAGE_SIZE = 80;

export function usePaginatedPoke(all: NationalPoke[], query: string) {
  const params = useSearchParams();

  const filtered = useMemo(
    () => applyFilterSort(all, params, query),
    [all, params, query],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // clamp: 필터/검색으로 결과가 줄어 page가 범위를 벗어나도 안전.
  const page = Math.min(
    Math.max(1, Number(params.get('page')) || 1),
    totalPages,
  );

  const items = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );

  return { items, page, totalPages, total: filtered.length };
}
