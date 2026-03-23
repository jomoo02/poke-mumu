'use client';

import InputFilter from './input-filter';
import { type Type } from '@/app/entities/type/model';
import { type NationalPokeView } from '../model';

import PokeCardList from './poke-card-list';

import ScrollToTopButton from './scroll-to-top-button';
import useController from '../model/useController';
import FilterAndSort from './filter-and-sort';

// import PokeCard from './poke-card-list/poke-card';

interface ContainerProps {
  pokes: NationalPokeView[];
  types: Type[];
}
export default function Container({ pokes, types }: ContainerProps) {
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
      <section>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {' '}
          {sortedPokes.slice(0, 20).map((poke) => (
            <PokeCard key={poke.pokeKey} poke={poke} />
          ))}
        </div> */}

        <PokeCardList pokes={sortedPokes} />
      </section>
    </div>
  );
}
