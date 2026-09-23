import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { createSearchMatcher, normalizeSearchText } from '@/shared/lib/search';

import type { NationalPoke } from '..';
import { SEARCH_PARAM_KEYS } from '../search-params';
import { matchesDexNumber, matchesForm, matchesGen, matchesType } from './match';
import { DEFAULT_SORT_KEY, SortKey, applySort } from '../poke-sort';

export function usePokeListFilter(pokes: NationalPoke[]) {
  const searchParams = useSearchParams();

  // getAll(...)은 매 렌더 새 배열을 반환하므로, memo 의존성은 문자열 키로 안정화한다.
  // (필터 결과는 선택 순서와 무관하지만 순서는 그대로 보존한다)
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
  const sort =
    (searchParams.get(SEARCH_PARAM_KEYS.sort) as SortKey) || DEFAULT_SORT_KEY;

  return useMemo(() => {
    const types = typeKey ? typeKey.split(',') : [];
    const forms = formKey ? formKey.split(',') : [];
    const gens = genKey ? genKey.split(',') : [];

    const normalizedQuery = normalizeSearchText(query);
    const matchesName = createSearchMatcher(normalizedQuery);

    return applySort(
      pokes.filter(
        (poke) =>
          matchesType(poke, types) &&
          matchesForm(poke.form?.identifier || null, forms) &&
          matchesGen(poke.generation, gens) &&
          (matchesName(poke.nameKo) || matchesDexNumber(poke, normalizedQuery)),
      ),
      sort,
    );
  }, [pokes, typeKey, formKey, genKey, query, sort]);
}
