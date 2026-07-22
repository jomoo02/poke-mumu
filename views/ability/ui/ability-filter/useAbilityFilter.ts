'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import {
  APPEARED_GENS,
  VALID_APPEARED_GENS,
  SEARCH_PARAMS,
} from '../../config';

export default function useAbilityFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedAppearedGens = useMemo(() => {
    const raw = searchParams.getAll(SEARCH_PARAMS.APPEARED);
    const gens = raw.map(Number).filter((n) => VALID_APPEARED_GENS.has(n));

    return new Set(gens);
  }, [searchParams]);

  const isChampions = searchParams.get(SEARCH_PARAMS.CHAMPIONS) === '1';

  const isActive = selectedAppearedGens.size > 0 || isChampions;

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

      params.delete(SEARCH_PARAMS.APPEARED);

      [...next].forEach((g) =>
        params.append(SEARCH_PARAMS.APPEARED, String(g)),
      );

      commit(params);
    },
    [selectedAppearedGens, searchParams, commit],
  );

  const toggleChampions = useCallback(
    (on: boolean) => {
      const params = new URLSearchParams(searchParams.toString());

      if (on) {
        params.set(SEARCH_PARAMS.CHAMPIONS, '1');
      } else {
        params.delete(SEARCH_PARAMS.CHAMPIONS);
      }

      commit(params);
    },
    [searchParams, commit],
  );

  const resetFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(SEARCH_PARAMS.APPEARED);
    params.delete(SEARCH_PARAMS.CHAMPIONS);

    commit(params);
  }, [searchParams, commit]);

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
