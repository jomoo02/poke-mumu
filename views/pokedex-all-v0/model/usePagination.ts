'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { type NationalPoke } from './poke';
import { applySort } from './sort';

export const PAGE_SIZE = 80;

export default function usePagination(all: NationalPoke[], query: string) {
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

  // 현재 페이지 첫 항목의 전역(0-based) 오프셋. 카드 순번 계산에 사용.
  const startIndex = (page - 1) * PAGE_SIZE;

  const items = useMemo(
    () => filtered.slice(startIndex, startIndex + PAGE_SIZE),
    [filtered, startIndex],
  );

  return { items, page, totalPages, startIndex, total: filtered.length };
}

function matchesType(poke: NationalPoke, sel: string[]): boolean {
  if (sel.length === 0) return true;
  const owned = new Set(
    [poke.type1?.identifier, poke.type2?.identifier].filter(
      (t): t is string => t != null,
    ),
  );
  return sel.every((t) => owned.has(t));
}

function matchesForm(formIdentifier: string | null, sel: string[]): boolean {
  return (
    sel.length === 0 || (formIdentifier != null && sel.includes(formIdentifier))
  );
}

function matchesQuery(poke: NationalPoke, q: string): boolean {
  if (!q) {
    return true;
  }

  if (poke.nameKo.includes(q)) {
    return true;
  }

  const asNum = Number(q);

  return Number.isInteger(asNum) && poke.dexNumber === asNum;
}

// type(AND)·form(OR)·검색·정렬을 합성.
// 검색어만 인자로 받고 나머지(type/form/sort)는 searchParams에서 읽는다.
function applyFilterSort(
  all: NationalPoke[],
  params: URLSearchParams,
  query: string,
): NationalPoke[] {
  const types = (params.get('type') ?? '').split(',').filter(Boolean);
  const forms = (params.get('form') ?? '').split(',').filter(Boolean);
  const q = query.trim();

  const filtered = all.filter(
    (p) =>
      matchesType(p, types) &&
      matchesForm(p.formIdentifier, forms) &&
      matchesQuery(p, q),
  );

  return applySort(filtered, params);
}
