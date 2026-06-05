import { useDeferredValue, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import type { Ability } from '@/entities/ability/model';

const VALID_APPEARED_GENS = new Set([3, 4, 5, 6, 7, 8, 9]);

export default function useAbilityList(abilities: Ability[]) {
  const { inputValue, setInputValue, deferredInputValue } = useInputValue();

  const { selectedAppearedGens, toggleAppearedGen, resetFilter } = useFilter();

  const filteredAbilities = useMemo(() => {
    const keyword = deferredInputValue.trim().toLowerCase();

    const filtered = abilities.filter(({ nameKo, nameEn, nameJa, gen }) => {
      const matchesName = [nameKo, nameEn.toLowerCase(), nameJa].some(
        (v) => v !== null && v.includes(keyword),
      );

      const matchesGen =
        selectedAppearedGens.size === 0 || selectedAppearedGens.has(gen);

      return matchesName && matchesGen;
    });

    return filtered.sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));
  }, [abilities, deferredInputValue, selectedAppearedGens]);

  return {
    inputValue,
    setInputValue,
    resetFilter,
    selectedAppearedGens,
    toggleAppearedGen,
    filteredAbilities,
    count: filteredAbilities.length,
    appearedGens: [...VALID_APPEARED_GENS],
  };
}

function useInputValue() {
  const [inputValue, setInputValue] = useState('');
  const deferredInputValue = useDeferredValue(inputValue);

  return {
    inputValue,
    setInputValue,
    deferredInputValue,
  };
}

function useFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedAppearedGens = useMemo(() => {
    const raw = searchParams.getAll('appeared');
    const gens = raw.map(Number).filter((n) => VALID_APPEARED_GENS.has(n));
    return new Set(gens);
  }, [searchParams]);

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

  const resetFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('appeared');
    params.delete('champ');

    commit(params);
  };

  return {
    selectedAppearedGens,
    toggleAppearedGen,
    resetFilter,
  };
}
