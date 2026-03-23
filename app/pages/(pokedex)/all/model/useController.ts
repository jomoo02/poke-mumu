import { useCallback } from 'react';

import { Type } from '@/app/entities/type/model';

import { type NationalPokeView } from '.';
import useInputName from './useInputName';
import usePokedex from './usePokedex';
import useSort from './useSort';
import useFilterTypes from './useFilterTypes';

export default function useController(pokes: NationalPokeView[]) {
  const { inputValue, setInputValue, normalizedSearch } = useInputName();

  const {
    filterTypes,
    addFilterType,
    toggleFilterType,
    removeFilterType,
    resetFilterTypes,
  } = useFilterTypes();

  const { sort, changeSort, resetSort } = useSort();

  const { enhancedPokes, sortedPokes } = usePokedex({
    pokes,
    sortOption: sort,
    filterTypes,
    normalizedSearch,
  });

  const resetConditions = () => {
    resetSort();
    resetFilterTypes();
  };

  const getFilteredCount = useCallback(
    (types: Type[]) => {
      if (types.length === 0) return enhancedPokes.length;
      return enhancedPokes.filter((poke) =>
        types.every(
          (t) =>
            poke.type1Identifier === t.identifier ||
            poke.type2Identifier === t.identifier,
        ),
      ).length;
    },
    [enhancedPokes],
  );

  return {
    sortedPokes,

    inputValue,
    setInputValue,

    sort,
    changeSort,
    resetSort,

    filterTypes,
    addFilterType,
    toggleFilterType,
    removeFilterType,
    resetFilterTypes,

    resetConditions,

    getFilteredCount,
  };
}
