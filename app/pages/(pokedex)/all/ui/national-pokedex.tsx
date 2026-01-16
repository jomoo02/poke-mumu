'use client';

import { memo } from 'react';

import { cn } from '@/app/shared/lib/cn';
import { Type } from '@/app/entities/type/model';

import { type NationalPokeView, useSortPokedex } from '../model';
import PokeCard from './poke-card';
import SortGroup from './sort-group';
import TypeFilter from './type-filter';

const Pokedex = memo(function Pokedex({
  pokes,
}: {
  pokes: NationalPokeView[];
}) {
  return (
    <div
      className={cn(
        'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity',
        'group-has-data-[state=pending]:opacity-40 group-has-data-[state=pending]:pointer-events-none',
        'max-w-7xl p-6 px-4 sm:px-6 w-full mx-auto',
      )}
    >
      {pokes.map((poke) => (
        <PokeCard key={poke.id} poke={poke} />
      ))}
    </div>
  );
});

export default function NationalDex({
  pokes,
  types,
}: {
  pokes: NationalPokeView[];
  types: Type[];
}) {
  const {
    handleChangeFilterType,
    handleChangeSortKey,
    sortedPokes,
    filterType,
    direction,
    sortKey,
    isStale,
  } = useSortPokedex(pokes);

  return (
    <div>
      <div
        className={cn(
          isStale ? ' opacity-50 ' : '',
          'flex justify-center transition duration-300',
        )}
      >
        <TypeFilter
          types={types}
          onChangeType={handleChangeFilterType}
          selectedType={filterType}
        />
      </div>

      <div
        className={cn(isStale ? ' opacity-50 ' : '', 'transition duration-300')}
      >
        <SortGroup
          onClickSortButton={handleChangeSortKey}
          direction={direction}
          selectedSortKey={sortKey}
        />
      </div>

      <div
        className={cn(
          isStale ? ' opacity-50 transition duration-300' : '',
          'transition duration-300',
        )}
      >
        <Pokedex pokes={sortedPokes} />
      </div>
    </div>
  );
}
