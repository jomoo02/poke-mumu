'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { SEARCH_PARAMS } from '../../config';

export default function useMoveFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedTypes = useMemo(
    () => new Set(searchParams.getAll(SEARCH_PARAMS.TYPE)),
    [searchParams],
  );

  const selectedDamageClasses = useMemo(
    () => new Set(searchParams.getAll(SEARCH_PARAMS.DAMAGE_CLASS)),
    [searchParams],
  );

  const isActive = selectedTypes.size > 0 || selectedDamageClasses.size > 0;

  const commit = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname],
  );

  const toggleMulti = useCallback(
    (key: string, value: string, current: Set<string>) => {
      const next = new Set(current);

      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }

      const params = new URLSearchParams(searchParams.toString());

      params.delete(key);

      [...next].forEach((v) => params.append(key, v));

      commit(params);
    },
    [searchParams, commit],
  );

  const toggleType = useCallback(
    (identifier: string) =>
      toggleMulti(SEARCH_PARAMS.TYPE, identifier, selectedTypes),
    [toggleMulti, selectedTypes],
  );

  const toggleDamageClass = useCallback(
    (identifier: string) =>
      toggleMulti(SEARCH_PARAMS.DAMAGE_CLASS, identifier, selectedDamageClasses),
    [toggleMulti, selectedDamageClasses],
  );

  const resetFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(SEARCH_PARAMS.TYPE);
    params.delete(SEARCH_PARAMS.DAMAGE_CLASS);

    commit(params);
  }, [searchParams, commit]);

  return {
    selectedTypes,
    selectedDamageClasses,
    isActive,
    toggleType,
    toggleDamageClass,
    resetFilter,
  };
}
