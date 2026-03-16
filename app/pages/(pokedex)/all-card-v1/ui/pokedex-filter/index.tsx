'use client';

import { useState } from 'react';

import { type Type } from '@/app/entities/type/model';

import { type Direction, type SortKey } from '../../model';
import FilterBar from './filter-bar';
import PokedexFilterInput from './pokedex-filter-input';
import PokedexFilterDialog from './pokedex-filter-dialog';
import TypeFilter from '../type-filter';
import ToggleDirection from './toggle-direction';
import SelectSortKey from './select-sortkey';
import TypeFilters from './type-filters';

interface PokedexFilterProps {
  allTypes: Type[];
  inputValue: string;
  setInputValue: (value: string) => void;
  filterTypes: string[];
  setFilterTypes: (type: string[]) => void;
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
  direction: Direction;
  toggleDirection: (d: Direction) => void;
}

export default function PokedexFilter({
  allTypes,
  inputValue,
  setInputValue,
  filterTypes,
  setFilterTypes,
  sortKey,
  setSortKey,
  toggleDirection,
  direction,
}: PokedexFilterProps) {
  // const activeFilterCount =
  //   (filterType !== 'all' ? 1 : 0) + (sortKey !== 'dexNumber' ? 1 : 0);
  const isDirty =
    filterTypes.length > 0 || sortKey !== 'dexNumber' || direction !== 'asc';
  return (
    <>
      {/* className="bg-card sticky top-14 z-10" */}
      <div className="px-4 sm:px-6 xl:px-14 pt-4">
        <div className="flex items-center gap-2">
          <PokedexFilterInput
            inputValue={inputValue}
            setInputValue={setInputValue}
          />

          <SelectSortKey sortKey={sortKey} setSortKey={setSortKey} />
          <ToggleDirection
            direction={direction}
            toggleDirection={toggleDirection}
          />

          {/* <PokedexFilterDialog
            filterTypes={filterTypes}
            sortKey={sortKey}
            setFilterTypes={setFilterTypes}
            setSortKey={setSortKey}
            allTypes={allTypes}
            direction={direction}
            setDirection={toggleDirection}
            isDirty={isDirty}
          /> */}
        </div>
      </div>
      {/* <FilterBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        activeFilterCount={activeFilterCount}
      /> */}
    </>
  );
}
