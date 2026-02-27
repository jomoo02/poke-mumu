'use client';

import { useRef } from 'react';
import { NationalPokeView, useSortPokedex } from '../../model';
import TableBody from './table-body';
import TableHeader from './table-header';
import TypeFilter from '../type-filter';
import { cn } from '@/app/shared/lib/cn';
import { Type } from '@/app/entities/type/model';
// import PokedexTanstack from '../pokedex-tanstack';
// import { Input } from '@/app/shared/ui/input';
import NameInput from './name-input';

interface PokedexTableProps {
  pokes: NationalPokeView[];
  types: Type[];
}

export default function PokedexTable({ pokes, types }: PokedexTableProps) {
  const {
    handleChangeFilterType,
    handleChangeSortKey,
    sortedPokes,
    filterType,
    direction,
    sortKey,
    isStale,
    inputValueFilterdPokes,
    inputValue,
    setInputValue,
  } = useSortPokedex(pokes);

  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!headerRef.current || !bodyRef.current) {
      return;
    }
    headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
  };

  return (
    <div
      className={cn('transition duration-300', isStale ? ' opacity-50 ' : '')}
    >
      <div className={cn('sticky top-16 bg-card z-20 w-full pt-6  ')}>
        <div className="flex gap-4 sm:gap-8 justify-center mb-2">
          <NameInput inputValue={inputValue} onChange={setInputValue} />
          <TypeFilter
            types={types}
            onChangeType={handleChangeFilterType}
            selectedType={filterType}
          />
        </div>
        <TableHeader ref={headerRef} onClick={handleChangeSortKey} />
      </div>

      <TableBody
        filters={filterType}
        pokes={inputValueFilterdPokes}
        ref={bodyRef}
        onScroll={handleScroll}
      />
    </div>
  );
}
