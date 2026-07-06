'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { type NationalPoke } from '../poke';
import { applyFilterAndSort } from './apply-condition';

export const PAGE_SIZE = 80;

export default function usePagination(all: NationalPoke[], query: string) {
  const params = useSearchParams();

  const filtered = useMemo(
    () => applyFilterAndSort(all, params, query),
    [all, params, query],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // clamp: 필터/검색으로 결과가 줄어 page가 범위를 벗어나도 안전.
  const page = Math.min(
    Math.max(1, Number(params.get('page')) || 1),
    totalPages,
  );

  // 현재 페이지 첫 항목의 전역(0-based) 오프셋. 카드 순번 계산에 사용.
  const startIndex = (page - 1) * PAGE_SIZE;

  const items = useMemo(
    () => filtered.slice(startIndex, startIndex + PAGE_SIZE),
    [filtered, startIndex],
  );

  return { items, page, totalPages, startIndex, total: filtered.length };
}
