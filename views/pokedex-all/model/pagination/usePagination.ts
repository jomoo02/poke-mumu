'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { type NationalPoke } from '../poke';
import { applyFilterAndSort } from './apply-condition';

export const PAGE_SIZE = 80;

export default function usePagination(allPokes: NationalPoke[], query: string) {
  const params = useSearchParams();

  const filtered = useMemo(
    () => applyFilterAndSort(allPokes, params, query),
    [allPokes, params, query],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const page = Math.min(
    Math.max(1, Number(params.get('page')) || 1),
    totalPages,
  );

  // 현재 페이지 첫 항목의 전역(0-based) 오프셋. 카드 순번 계산에 사용.
  const startIndex = (page - 1) * PAGE_SIZE;

  const pagePokes = useMemo(
    () => filtered.slice(startIndex, startIndex + PAGE_SIZE),
    [filtered, startIndex],
  );

  return {
    pagePokes,
    page,
    totalPages,
    startIndex,
    filteredCount: filtered.length,
  };
}
