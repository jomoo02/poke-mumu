'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { APPEARED_GENS, VALID_APPEARED_GENS } from '../../model/config';

// 필터는 URL만 조작한다. 목록은 같은 URL을 읽어 스스로 걸러낸다.
export default function useAbilityFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedAppearedGens = useMemo(() => {
    const raw = searchParams.getAll('appeared');
    const gens = raw.map(Number).filter((n) => VALID_APPEARED_GENS.has(n));
    return new Set(gens);
  }, [searchParams]);

  const isChampions = searchParams.get('champions') === '1';

  const commit = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname],
  );

  const toggleAppearedGen = useCallback(
    (gen: number) => {
      if (!VALID_APPEARED_GENS.has(gen)) {
        return;
      }

      const next = new Set(selectedAppearedGens);

      if (next.has(gen)) {
        next.delete(gen);
      } else {
        next.add(gen);
      }

      const params = new URLSearchParams(searchParams.toString());

      params.delete('appeared');

      [...next].forEach((g) => params.append('appeared', String(g)));

      commit(params);
    },
    [selectedAppearedGens, searchParams, commit],
  );

  const toggleChampions = useCallback(
    (on: boolean) => {
      const params = new URLSearchParams(searchParams.toString());

      if (on) {
        params.set('champions', '1');
      } else {
        params.delete('champions');
      }

      commit(params);
    },
    [searchParams, commit],
  );

  const resetFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('appeared');
    params.delete('champions');

    commit(params);
  }, [searchParams, commit]);

  const isActive = selectedAppearedGens.size > 0 || isChampions;

  return {
    selectedAppearedGens,
    isChampions,
    isActive,
    toggleAppearedGen,
    toggleChampions,
    resetFilter,
    gens: APPEARED_GENS,
  };
}
