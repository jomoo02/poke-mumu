'use client';

import InputFilter from './input-filter';
import { type Type } from '@/app/entities/type/model';
import { type NationalPokeView } from '../model';

import PokeCardList from './poke-card-list';

import ScrollToTopButton from './scroll-to-top-button';
// import FilterDrawer from './filter-drawer';
// import { useState } from 'react';
// import { RotateCwIcon, SlidersHorizontalIcon } from 'lucide-react';
// import { Button } from '@/app/shared/ui/button';
// import usePokedexV3 from '../model/usePokedexV3';
// import SortPill from './sort-pill';
// import TypePillList from './type-pill-list';
import useController from '../model/useController';
import FilterAndSort from './filter-and-sort';

interface ContainerProps {
  pokes: NationalPokeView[];
  types: Type[];
}
export default function Container({ pokes, types }: ContainerProps) {
  // const {
  //   sortKey,
  //   direction,
  //   setSort,
  //   filterTypes,
  //   setFilterTypes,
  //   pokes: sortedPokes,
  //   inputValue,
  //   setInputValue,
  //   sort,
  //   getFilteredCount,
  // } = usePokedexV3(pokes);

  const {
    sortedPokes,
    inputValue,
    setInputValue,
    sort,
    changeSort,
    resetSort,
    filterTypes,
    toggleFilterType,
    resetConditions,
    // removeFilterType,
    // getFilteredCount,
  } = useController(pokes);

  return (
    <div className="flex flex-col">
      <ScrollToTopButton />
      <section>
        <InputFilter inputValue={inputValue} onChange={setInputValue} />
      </section>
      <FilterAndSort
        allTypes={types}
        filterTypes={filterTypes}
        onToggleType={toggleFilterType}
        sortOption={sort}
        resetSortOption={resetSort}
        onSortOptionChange={changeSort}
        onResetConditions={resetConditions}
        totalCount={pokes.length}
        filteredCount={sortedPokes.length}
      />
      {/* <div className="flex items-center gap-4 py-4">
        {isRoateView && (
          <Button className="size-10" variant={'outline'}>
            <RotateCwIcon className="size-4" />
          </Button>
        )}

        <div className="flex flex-wrap gap-1">
          <TypePillList types={filterTypes} onRemove={removeFilterType} />
          <SortPill sort={sort} onReset={resetSort} />
        </div>

        <span className="ml-auto text-sm text-muted-foreground text-pretty text-center">
          {sortedPokes.length === pokes.length ? (
            <>{`${pokes.length} Pokémon`}</>
          ) : (
            <> {`${sortedPokes.length} of ${pokes.length} Pokémon`}</>
          )}
        </span>
        <div className="w-px h-7 bg-border" />
        <Button
          variant="outline"
          className="size-10 sm:w-auto sm:h-10 sm:px-3"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="hidden sm:inline">필터 & 정렬</span>

          <SlidersHorizontalIcon className="size-4" />
        </Button>
      </div>
      <FilterDrawer
        open={drawerOpen}
        sort={sort}
        onOpenChange={setDrawerOpen}
        allTypes={types}
        selectedTypes={filterTypes}

        onResetConditions={resetConditions}
        filteredCount={sortedPokes.length}
        onSortChange={changeSort}
        onToggleType={toggleFilterType}

      /> */}
      <section>
        <PokeCardList pokes={sortedPokes} />
      </section>
    </div>
  );
}
