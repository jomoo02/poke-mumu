// views/pokedex-all/model/pokedex/pokedex-provider.tsx
'use client';

import { useCallback, useMemo, type ReactNode } from 'react';

import { type NationalPoke } from '../';
import {
  SearchContext,
  ControlContext,
  ResultContext,
  type SearchContextValue,
  type ControlContextValue,
} from './context';
import useSearch from './useSearch';
import useSort from './useSort';
import useFilters from './useFilters';
import usePokedex from './usePokedex';

interface PokedexProviderProps {
  pokes: NationalPoke[];
  children: ReactNode;
}

export default function PokedexProvider({
  pokes,
  children,
}: PokedexProviderProps) {
  const { inputValue, setInputValue, normalizedSearch } = useSearch();
  const { sort, changeSort, resetSort } = useSort();
  const {
    filterTypes,
    toggleFilterType,
    removeFilterType,
    resetFilterType,
    resetFilters,
    filters,
    filterForms,
    toggleFilterForm,
    removeFilterForm,
    resetFilterForm,
  } = useFilters();

  const { sortedPokes } = usePokedex({
    pokes,
    filters,
    normalizedSearch,
    sort,
  });

  const resetConditions = useCallback(() => {
    resetSort();
    resetFilters();
  }, [resetSort, resetFilters]);

  // ── value 안정화: 각 Context는 자기 의존성 바뀔 때만 새 참조 ──
  const searchValue = useMemo<SearchContextValue>(
    () => ({ inputValue, setInputValue }),
    [inputValue, setInputValue],
  );

  const controlValue = useMemo<ControlContextValue>(
    () => ({
      sort,
      changeSort,
      resetSort,
      filterTypes,
      toggleFilterType,
      removeFilterType,
      resetFilters,
      resetConditions,
      filterForms,
      toggleFilterForm,
      removeFilterForm, // ← 추가
      resetFilterType,
      resetFilterForm,
    }),
    [
      sort,
      changeSort,
      resetSort,
      filterTypes,
      toggleFilterType,
      removeFilterType,
      resetFilters,
      resetConditions,
      filterForms,
      toggleFilterForm,
      removeFilterForm, // ← 추가
      resetFilterType,
      resetFilterForm,
    ],
  );

  // sortedPokes는 usePokedex에서 이미 useMemo로 안정 → 그대로
  return (
    <SearchContext.Provider value={searchValue}>
      <ControlContext.Provider value={controlValue}>
        <ResultContext.Provider value={sortedPokes}>
          {children}
        </ResultContext.Provider>
      </ControlContext.Provider>
    </SearchContext.Provider>
  );
}
