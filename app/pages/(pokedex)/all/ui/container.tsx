'use client';

import { type Type } from '@/app/entities/type/model';

import { type NationalPokeView } from '../model';
import TypeFilter from './type-filter';
import NameInput from './name-input';
import usePokedex from '../model/usePokedex';
import ScrollToTopButton from './scroll-to-top-button';
import Pokedex from './pokedex';

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
  return (
    <div className="w-full">
      <ScrollToTopButton />
      <div className="flex gap-4 sm:gap-6 justify-between sm:justify-center px-4 sm:px-6 xl:px-16 w-full ">
        <NameInput inputValue={inputValue} onChange={setInputValue} />
        <TypeFilter
          types={types}
          onChangeType={setFilterType}
          selectedType={filterType}
        />
      </div>
      <div
        className="my-8 sm:px-6 xl:px-14 w-full relative"
        style={{ contain: 'layout' }}
      >
        <Pokedex
          pokes={sortedPokes}
          onClickHeader={setSortKey}
          sortKey={sortKey}
          direction={direction}
        />
      </div>
    </div>
  );
}
