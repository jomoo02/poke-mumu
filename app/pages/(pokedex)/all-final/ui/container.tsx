'use client';

import { type Type } from '@/app/entities/type/model';

import { type NationalPokeView } from '../model';
import TypeFilter from './type-filter';
import NameInput from './name-input';
import usePokedex from '../model/usePokedex';
import ScrollToTopButton from './scroll-to-top-button';
import PokedexTableV0 from './pokedex-table-v0';
import useScroll from '../model/useScroll';
import MobilePokedexTable from './mobile-pokedex-table';
import PokedexTable from './pokedex-table';
import { useIsMobile } from '@/app/shared/model/use-mobile';
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

  const isMoble = useIsMobile();
  return (
    <div className="w-full">
      <ScrollToTopButton />
      <div className="flex gap-4 sm:gap-6 justify-center p-4 pt-0 sm:px-6 xl:px-16 w-full">
        <NameInput inputValue={inputValue} onChange={setInputValue} />
        <TypeFilter
          types={types}
          onChangeType={setFilterType}
          selectedType={filterType}
        />
      </div>
      {isMoble ? (
        <div>
          {' '}
          <MobilePokedexTable
            pokes={sortedPokes}
            onClickHeader={setSortKey}
            sortKey={sortKey}
            direction={direction}
            totalPokeCount={pokes.length}
          />
        </div>
      ) : (
        <div className="px-6 xl:px-16 w-full relative">
          <PokedexTable
            pokes={sortedPokes}
            onClickHeader={setSortKey}
            sortKey={sortKey}
            direction={direction}
          />
        </div>
      )}
    </div>
  );
}
