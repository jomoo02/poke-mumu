'use client';

import type { Type } from '@/entities/type/model';

import useSearchParamsState from '../model/useSearchParamsState';
import usePagination from '../model/usePagination';
import useSearchQuery from '../model/useSearchQuery';
import type { NationalPoke } from '../model/poke';
import SearchInput from './search-input';
import PokeCardList from './poke-card-list.tsx';
import { parseSort } from '../model/sort';
import TypeFilter from './type-filter';
import FormFilter from './form-filter';
import PokeSort from './poke-sort';

interface PokedexViewProps {
  pokes: NationalPoke[];
  types: Type[];
}

export default function PokedexView({ pokes, types }: PokedexViewProps) {
  const { searchParams, update } = useSearchParamsState();
  const { input, setInput, deferredInput } = useSearchQuery();
  const { items, page, totalPages, total, startIndex } = usePagination(
    pokes,
    deferredInput,
  );
  const { key: sortKey } = parseSort(searchParams);

  const handleSearchInputChange = (value: string) => {
    setInput(value);

    if (searchParams.get('page')) {
      update({});
    }
  };

  const selectedTypes = (searchParams.get('type') ?? '')
    .split(',')
    .filter(Boolean);

  const selectedForms = (searchParams.get('form') ?? '')
    .split(',')
    .filter(Boolean);

  const handleTypeToggle = (id: string) => {
    const next = selectedTypes.includes(id)
      ? selectedTypes.filter((t) => t !== id)
      : [...selectedTypes, id];
    update({ type: next });
  };

  const handleTypeReset = () => {
    update({ type: null });
  };

  const handleFormToggle = (id: string) => {
    const next = selectedForms.includes(id)
      ? selectedForms.filter((t) => t !== id)
      : [...selectedForms, id];
    update({ form: next });
  };

  const handleFormReset = () => {
    update({ form: null });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:gap-6">
        <SearchInput value={input} onChange={handleSearchInputChange} />
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center">
          <div className="flex gap-2 overflow-auto">
            <TypeFilter
              selected={selectedTypes}
              onToggle={handleTypeToggle}
              onReset={handleTypeReset}
              types={types}
            />
            <FormFilter
              selected={selectedForms}
              onToggle={handleFormToggle}
              onReset={handleFormReset}
            />
            <PokeSort />
          </div>
          <div className="text-sm text-foreground/70 shrink-0">{total}마리</div>
        </div>
      </div>

      <PokeCardList pokes={items} startIndex={startIndex} sortKey={sortKey} />
    </div>
  );
}
