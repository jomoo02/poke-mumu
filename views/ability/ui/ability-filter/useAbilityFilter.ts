import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const VALID_APPEARED_GENS = new Set([3, 4, 5, 6, 7, 8, 9]);

export default function useAbilityFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedAppearedGens = useMemo(() => {
    const raw = searchParams.getAll('appeared');
    const gens = raw.map(Number).filter((n) => VALID_APPEARED_GENS.has(n));
    return new Set(gens);
  }, [searchParams]);

  const isChampions = searchParams.get('champions') === '1';
  const commit = (params: URLSearchParams) => {
    const query = params.toString();
    router.replace(query ? `?${query}` : '?', { scroll: false });
  };

  const toggleAppearedGen = (gen: number) => {
    if (!VALID_APPEARED_GENS.has(gen)) {
      return;
    }

    const next = new Set(selectedAppearedGens);

    next.has(gen) ? next.delete(gen) : next.add(gen);

    const params = new URLSearchParams(searchParams.toString());

    params.delete('appeared');

    [...next].forEach((g) => params.append('appeared', String(g)));
    commit(params);
  };

  const toggleChampions = (on: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (on) {
      params.set('champions', '1');
    } else {
      params.delete('champions');
    }
    commit(params);
    console.log('toggle', on);
  };
  const resetFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('appeared');
    params.delete('champions');

    commit(params);
  };

  const isActive = selectedAppearedGens.size > 0 || isChampions;

  return {
    selectedAppearedGens,
    isChampions,
    isActive,
    toggleAppearedGen,
    toggleChampions,
    resetFilter,
    gens: [...VALID_APPEARED_GENS],
  };
}
