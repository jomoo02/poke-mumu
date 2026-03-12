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

  return (
    <>
      <div className="bg-card sticky top-14 z-10">
        <div className="px-4 sm:px-6 xl:px-14 py-4 flex items-center gap-4">
          <PokedexFilterInput
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          {/* <TypeFilter
            types={allTypes}
            onChangeType={setFilterType}
            selectedType={filterType}
          />
          <ToggleDirection
            direction={direction}
            toggleDirection={toggleDirection}
          />
          <SelectSortKey sortKey={sortKey} setSortKey={setSortKey} /> */}
          <PokedexFilterDialog
            filterTypes={filterTypes}
            sortKey={sortKey}
            setFilterTypes={setFilterTypes}
            setSortKey={setSortKey}
            allTypes={allTypes}
            direction={direction}
          />
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
