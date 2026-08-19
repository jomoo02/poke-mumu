import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { SEARCH_PARAMS } from '../../config';

export default function useTypeFitler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedTypes = useMemo(
    () => new Set(searchParams.getAll(SEARCH_PARAMS.TYPE)),
    [searchParams],
  );

  const commit = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname],
  );

  const toggleType = useCallback(
    (identifier: string) => {
      const next = new Set(selectedTypes);

      if (next.has(identifier)) {
        next.delete(identifier);
      } else {
        next.add(identifier);
      }

      const params = new URLSearchParams(searchParams.toString());

      params.delete(SEARCH_PARAMS.TYPE);

      [...next].forEach((v) => params.append(SEARCH_PARAMS.TYPE, v));

      commit(params);
    },
    [selectedTypes],
  );

  const resetType = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(SEARCH_PARAMS.TYPE);

    commit(params);
  }, [searchParams, commit]);

  const isSelectedType = (identifier: string) => selectedTypes.has(identifier);

  const isActive = selectedTypes.size > 0;

  return {
    selectedTypes,
    toggleType,
    resetType,
    isSelectedType,
    isActive,
  };
}
