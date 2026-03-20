'use client';

import InputFilter from './input-filter';
import { type Type } from '@/app/entities/type/model';
import { isDefaultSort, type NationalPokeView } from '../model';

import PokeCardList from './poke-card-list';

import ScrollToTopButton from './scroll-to-top-button';
import FilterDrawer from './filter-drawer';

import { useState } from 'react';
import { RotateCwIcon, SlidersHorizontalIcon } from 'lucide-react';
import { Button } from '@/app/shared/ui/button';
import usePokedexV3 from '../model/usePokedexV3';
import SortPill from './sort-pill';
import TypePillList from './type-pill-list';

interface ContainerProps {
  pokes: NationalPokeView[];
  types: Type[];
}
export default function Container({ pokes, types }: ContainerProps) {
  // const {
  //   pokes: sortedPokes,
  //   toggleSortKey,
  //   filterTypes,
  //   setFilterTypes,
  //   inputValue,
  //   sortKey,
  //   direction,
  //   setInputValue,
  // } = usePokedex(pokes);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // const {
  //   sortKey,
  //   direction,
  //   setSort,
  //   filterTypes,
  //   setFilterTypes,
  //   pokes: sortedPokes,
  //   inputValue,
  //   setInputValue,
  //   getFilteredCount,
  // } = usePokedexV2(pokes);
  const {
    sortKey,
    direction,
    setSort,
    filterTypes,
    setFilterTypes,
    pokes: sortedPokes,
    inputValue,
    setInputValue,
    sort,
    getFilteredCount,
  } = usePokedexV3(pokes);

  const isRoateView = filterTypes.length > 0 || !isDefaultSort(sort);

  return (
    <div className="flex flex-col">
      <ScrollToTopButton />
      <section>
        <InputFilter inputValue={inputValue} onChange={setInputValue} />
      </section>
      <div className="flex items-center gap-4 py-4">
        {isRoateView && (
          <Button className="size-10" variant={'outline'}>
            <RotateCwIcon className="size-4" />
          </Button>
        )}

        <div className="flex flex-wrap gap-1">
          <TypePillList
            types={filterTypes}
            onRemove={(type) =>
              setFilterTypes(
                filterTypes.filter((t) => t.identifier !== type.identifier),
              )
            }
          />
          <SortPill sort={sort} onReset={setSort} />
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
        onTypesChange={setFilterTypes}
        // sortKey={sortKey}
        // totalCount={pokes.length}
        // direction={direction}
        filteredCount={sortedPokes.length}
        onSortChange={setSort}
      />
      <section>
        <PokeCardList pokes={sortedPokes} />
      </section>
    </div>
  );
}
