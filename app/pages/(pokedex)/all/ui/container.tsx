'use client';

import { type Type } from '@/app/entities/type/model';

import { type NationalPokeView } from '../model';
import TypeFilter from './type-filter';
import NameInput from './name-input';
import usePokedex from '../model/usePokedex';
import ScrollToTopButton from './scroll-to-top-button';
import PokedexTable from './pokedex-table';
import useScroll from '../model/useScroll';

interface PokedexTableProps {
  pokes: NationalPokeView[];
  types: Type[];
}

export default function Container({ pokes, types }: PokedexTableProps) {
  const {
    pokes: sortedPokes,
    setSortKey,
    filterType,
    setFilterType,
    inputValue,
    sortKey,
    direction,
    setInputValue,
  } = usePokedex(pokes);

  const { bodyRef, headerRef, handleScroll, isScrolledX } = useScroll();

  return (
    <div className="w-full">
      <ScrollToTopButton />

      <div className="flex gap-4 sm:gap-6 justify-between sm:justify-center mb-2 pb-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 w-full">
        <NameInput inputValue={inputValue} onChange={setInputValue} />
        <TypeFilter
          types={types}
          onChangeType={setFilterType}
          selectedType={filterType}
        />
      </div>

      <div className="px-0 sm:px-6 md:px-8 lg:px-10 xl:px-14 w-full">
        <PokedexTable
          pokes={sortedPokes}
          bodyRef={bodyRef}
          headerRef={headerRef}
          onClickHeader={setSortKey}
          onScroll={handleScroll}
          sortKey={sortKey}
          direction={direction}
          isScrolledX={isScrolledX}
          totalPokeCount={pokes.length}
        />
      </div>
    </div>
  );
}
