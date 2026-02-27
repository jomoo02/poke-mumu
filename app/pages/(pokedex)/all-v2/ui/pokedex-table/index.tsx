'use client';

import { useRef } from 'react';
import { NationalPokeView, useSortPokedex } from '../../model';
import TableBody from './table-body';
import TableHeader from './table-header';
import TypeFilter from '../type-filter';
import { cn } from '@/app/shared/lib/cn';
import { Type } from '@/app/entities/type/model';

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
    // inputValueFilterdPokes,
    inputValue,
    setInputValue,
  } = useSortPokedex(pokes);

  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!headerRef.current || !bodyRef.current) return;
    headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
  };

  return (
    <div>
      <div
        className={cn(
          isStale ? ' opacity-50 ' : '',
          'transition duration-300 sticky top-14 bg-card z-20 w-full mx-auto px-4 sm:px-6 py-2',
        )}
      >
        <div className="text-sm font-medium py-1">타입</div>
        <TypeFilter
          types={types}
          onChangeType={handleChangeFilterType}
          selectedType={filterType}
        />
      </div>
      <div className="max-w-384 mx-auto">
        <TableHeader ref={headerRef} />
        <TableBody pokes={pokes} ref={bodyRef} onScroll={handleScroll} />
      </div>
    </div>
  );
}
