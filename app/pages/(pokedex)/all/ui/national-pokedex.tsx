'use client';

import { cn } from '@/app/shared/lib/cn';

import { type NationalPokeView, useSortPokedex } from '../model';
import PokeCard from './poke-card';
import SortGroup from './sort-group';
import { Type } from '@/app/entities/type/model';
import TypeFilter from './type-filter';

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
  } = useSortPokedex(pokes, types);
  return (
    <div>
      <div className="flex justify-center">
        <TypeFilter
          types={types}
          onChangeType={handleChangeFilterType}
          selectedType={filterType}
        />
      </div>

      <SortGroup
        onClickSortButton={handleChangeSortKey}
        direction={direction}
        selectedSortKey={sortKey}
      />
      <div
        className={cn(
          'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity',
          'group-has-data-[state=pending]:opacity-40 group-has-data-[state=pending]:pointer-events-none',
          'max-w-7xl p-6 w-full mx-auto',
        )}
      >
        {sortedPokes.map((poke) => (
          <PokeCard key={poke.id} poke={poke} />
        ))}
      </div>
    </div>
  );
}
