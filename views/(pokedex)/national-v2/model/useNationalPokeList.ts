'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { createSearchMatcher, normalizeSearchText } from '@/shared/lib/search';
import { applySort, resolveSortState } from '@/features/sort-control';

import type { NationalPoke } from './national-poke';
import { SEARCH_PARAM_KEYS } from './search-params';
import { pokeSortConfig } from './sort-config';
import { matchesDexNumber, matchesForm, matchesGen, matchesType } from './match';

/**
 * URL(검색·필터·정렬)을 읽어 목록을 거르고 정렬한다.
 * - 매칭 규칙은 도메인 로직이라 이 뷰가 소유(match.ts).
 * - 정렬은 feature의 applySort에 config를 주입해 위임.
 */
export function useNationalPokeList(pokes: NationalPoke[]) {
  const searchParams = useSearchParams();

  // getAll은 매 렌더 새 배열이라 memo 의존성은 문자열로 안정화한다.
  const typeKey = searchParams
    .getAll(SEARCH_PARAM_KEYS.type)
    .filter(Boolean)
    .join(',');
  const formKey = searchParams
    .getAll(SEARCH_PARAM_KEYS.form)
    .filter(Boolean)
    .join(',');
  const genKey = searchParams
    .getAll(SEARCH_PARAM_KEYS.gen)
    .filter(Boolean)
    .join(',');
  const query = searchParams.get(SEARCH_PARAM_KEYS.search) || '';
  const sortRaw = searchParams.get('sort');
  const dirRaw = searchParams.get('dir');

  return useMemo(() => {
    const types = typeKey ? typeKey.split(',') : [];
    const forms = formKey ? formKey.split(',') : [];
    const gens = genKey ? genKey.split(',') : [];

    const normalizedQuery = normalizeSearchText(query);
    const matchesName = createSearchMatcher(normalizedQuery);

    const filtered = pokes.filter(
      (poke) =>
        matchesType(poke, types) &&
        matchesForm(poke.form?.identifier ?? null, forms) &&
        matchesGen(poke.generation, gens) &&
        (matchesName(poke.nameKo) || matchesDexNumber(poke, normalizedQuery)),
    );

    const sortState = resolveSortState(pokeSortConfig, sortRaw, dirRaw);
    return applySort(filtered, sortState, pokeSortConfig);
  }, [pokes, typeKey, formKey, genKey, query, sortRaw, dirRaw]);
}
