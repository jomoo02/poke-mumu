'use client';

import InputFilter from './input-filter';
import { type Type } from '@/app/entities/type/model';
import { type NationalPokeView } from '../model';
import usePokedex from '../model/usePokedex';
import PokeCardList from './poke-card-list';
import TypeFilter from './type-filter';
import SortButtonList from './sort-button-list';
import ScrollToTopButton from './scroll-to-top-button';

interface ContainerProps {
  pokes: NationalPokeView[];
  types: Type[];
}
export default function Container({ pokes, types }: ContainerProps) {
  const {
    pokes: sortedPokes,
    toggleSortKey,
    filterTypes,
    setFilterTypes,
    inputValue,
    sortKey,
    direction,
    setInputValue,
  } = usePokedex(pokes);

  return (
    <div className="flex flex-col">
      <ScrollToTopButton />
      <section>
        <InputFilter inputValue={inputValue} onChange={setInputValue} />
      </section>

      <section className="pt-2">
        <SortButtonList
          sortKey={sortKey}
          setSortKey={toggleSortKey}
          direction={direction}
        />
      </section>
      <section className="pt-1">
        <TypeFilter
          allTypes={types}
          selectedTypes={filterTypes}
          onChangeSelectType={setFilterTypes}
          count={sortedPokes.length}
          totalCount={pokes.length}
        />
      </section>
      <section>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedPokes.slice(0, 50).map((poke) => (
            <PokeCardV2 key={poke.pokeKey} poke={poke} />
          ))}

          {sortedPokes.slice(0, 50).map((poke) => (
            <PokeCardV3 key={poke.pokeKey} poke={poke} />
          ))}
        </div> */}

        <PokeCardList pokes={sortedPokes} />
      </section>
    </div>
  );
}
