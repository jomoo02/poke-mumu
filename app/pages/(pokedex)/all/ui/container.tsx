'use client';

import InputFilter from './input-filter';
import { type Type } from '@/app/entities/type/model';
import { type NationalPokeView } from '../model';
import usePokedex from '../model/usePokedex';
import PokeCardList from './poke-card-list';
import TypeFilter from './type-filter';
import SortButtonList from './sort-button-list';

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
    <div className="flex flex-col gap-4">
      <section>
        <InputFilter inputValue={inputValue} onChange={setInputValue} />
      </section>

      <section>
        <TypeFilter
          allTypes={types}
          selected={filterTypes}
          onChange={setFilterTypes}
          count={sortedPokes.length}
          totalCount={pokes.length}
        />
      </section>
      <section>
        <SortButtonList
          sortKey={sortKey}
          setSortKey={toggleSortKey}
          direction={direction}
        />
      </section>

      <section>
        <PokeCardList pokes={sortedPokes} />
      </section>
    </div>
  );
}
