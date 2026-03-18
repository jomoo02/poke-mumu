'use client';

import { type Type } from '@/app/entities/type/model';

import { type NationalPokeView } from '../model';
import TypeFilter from './type-filter';
import NameInput from './name-input';
import usePokedex from '../model/usePokedex';
import usePokedexV2 from '../model/usePokedexV2';
import ScrollToTopButton from './scroll-to-top-button';
import Pokedex from './pokedex';
import PokeCard from './poke-card';
import PokedexFilter from './pokedex-filter';
import PokeCardGrid from './virtual-container';
import SelectSortKey from './select-sortkey';
import ToggleDirection from './toggle-direction';
import SelectSortKeyV2 from './select-sortkey-v2';
import usePokedexV3 from '../model/usePokedexV3';
import PokedexFilterInput from './pokedex-filter-input';
import TypeFilterV2 from './type-filter-v2';

interface PokedexTableProps {
  pokes: NationalPokeView[];
  types: Type[];
}

export default function Container({ pokes, types }: PokedexTableProps) {
  // const {
  //   pokes: sortedPokes,
  //   setSortKey,
  //   filterType,
  //   setFilterType,
  //   inputValue,
  //   sortKey,
  //   direction,
  //   setInputValue,
  //   toggleDirection,
  // } = usePokedex(pokes);
  // const {
  //   pokes: sortedPokes,
  //   setSortKey,
  //   filterTypes,
  //   setFilterTypes,
  //   inputValue,
  //   sortKey,
  //   direction,
  //   setInputValue,
  //   setDirection,
  // } = usePokedexV2(pokes);

  const {
    pokes: sortedPokes,
    toggleSortKey,
    filterTypes,
    setFilterTypes,
    inputValue,
    sortKey,
    direction,
    setInputValue,

    // setFilterTypes,
  } = usePokedexV3(pokes);
  return (
    <div className="w-full">
      <ScrollToTopButton />
      {/* <PokedexFilter
        allTypes={types}
        setFilterTypes={setFilterTypes}
        filterTypes={filterTypes}
        inputValue={inputValue}
        setInputValue={setInputValue}
        sortKey={sortKey}
        setSortKey={setSortKey}
        direction={direction}
        toggleDirection={setDirection}
      /> */}
      {/* <TypeFilter
        allTypes={types}
        selected={filterTypes}
        onChange={setFilterTypes}
      >
        <div className="px-4 sm:px-6 xl:px-14 py-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-4 gap-y-2 sm:items-center">
          <TypeFilter.Trigger />
          <TypeFilter.Panel className="sm:col-span-2" />
          <div className="flex gap-2 items-center justify-between sm:row-start-1 sm:col-start-2">
            <div className="text-sm text-muted-foreground">
              {`${sortedPokes.length}마리 포켓몬`}
            </div>
            <div className="flex gap-2 items-center">
              <SelectSortKey sortKey={sortKey} setSortKey={setSortKey} />
              <ToggleDirection
                direction={direction}
                toggleDirection={setDirection}
              />
            </div>
          </div>
        </div>
      </TypeFilter> */}
      <div className="px-4 sm:px-6 xl:px-14 py-4 flex flex-col gap-4">
        <PokedexFilterInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <div>
          <TypeFilterV2
            allTypes={types}
            selected={filterTypes}
            onChange={setFilterTypes}
            count={sortedPokes.length}
            totalCount={pokes.length}
          />

          {/* <TypeFilter
            allTypes={types}
            selected={filterTypes}
            onChange={setFilterTypes}
          >
            <TypeFilter.Trigger />
            <TypeFilter.Panel className="sm:col-span-2" />
          </TypeFilter> */}
        </div>

        <SelectSortKeyV2
          sortKey={sortKey}
          setSortKey={toggleSortKey}
          direction={direction}
        />
      </div>

      {/* <div className="flex gap-4 sm:gap-6 justify-between sm:justify-center px-4 sm:px-6 xl:px-16 w-full ">
        <NameInput inputValue={inputValue} onChange={setInputValue} />
        <TypeFilter
          types={types}
          onChangeType={setFilterType}
          selectedType={filterType}
        />
      </div> */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 xl:px-14">
        {sortedPokes.slice(0, 30).map((poke) => (
          <PokeCard key={poke.pokeKey} poke={poke} />
        ))}
      </div> */}
      <PokeCardGrid pokes={sortedPokes} />
    </div>
  );
}
