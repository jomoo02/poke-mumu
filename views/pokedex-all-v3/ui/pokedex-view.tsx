'use client';

import { type Type } from '@/entities/type/model';

import { type NationalPoke } from '../model';
import { useListParams } from '../model/use-list-params';
import { parseSort } from '../model/sort';
import { useSearchQuery } from '../model/use-search-query';
import { usePaginatedPoke } from '../model/use-paginated-poke';
import SearchInput from './search-input';
import SortControl from './sort-control';
import FilterSheet from './filter-sheet';
import PokeCardList from './poke-card-list';
import PokePagination from './poke-pagination';

interface PokedexViewProps {
  all: NationalPoke[];
  types: Type[];
}

// useSearchParams/필터/정렬/검색/페이지네이션을 담당하는 클라이언트 오케스트레이터.
export default function PokedexView({ all, types }: PokedexViewProps) {
  const { searchParams, update } = useListParams();
  const { input, setInput, effectiveQuery } = useSearchQuery();
  const { items, page, totalPages, total, startIndex } = usePaginatedPoke(
    all,
    effectiveQuery,
  );

  const selectedTypes = (searchParams.get('type') ?? '')
    .split(',')
    .filter(Boolean);
  const selectedForms = (searchParams.get('form') ?? '')
    .split(',')
    .filter(Boolean);

  const { key: sortKey } = parseSort(searchParams);

  // 검색은 URL 미경유 → 자동 page 리셋이 안 걸림. page가 있을 때만 정리.
  const onSearchChange = (value: string) => {
    setInput(value);
    if (searchParams.get('page')) update({});
  };

  // 타입: AND + 최대 2개(나머지는 UI에서 비활성화되므로 cap 초과 진입 불가).
  const toggleType = (id: string) => {
    const next = selectedTypes.includes(id)
      ? selectedTypes.filter((t) => t !== id)
      : [...selectedTypes, id];
    update({ type: next });
  };

  const toggleForm = (id: string) => {
    const next = selectedForms.includes(id)
      ? selectedForms.filter((t) => t !== id)
      : [...selectedForms, id];
    update({ form: next });
  };

  const resetFilters = () => update({ type: null, form: null });

  // 페이지 이동만 push(뒤로가기로 되감김) + 맨 위로 스크롤.
  const goToPage = (p: number) => {
    update(
      { page: p > 1 ? String(p) : null },
      { resetPage: false, history: 'push' },
    );
    // 모바일에서 먼 거리 smooth 스크롤이 콘텐츠 리플로우로 취소되는 것을 피해
    // 다음 프레임에 문서 최상단으로 스크롤한다.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 ">
        <SearchInput value={input} onChange={onSearchChange} />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <FilterSheet
              types={types}
              selectedTypes={selectedTypes}
              selectedForms={selectedForms}
              resultCount={total}
              onToggleType={toggleType}
              onToggleForm={toggleForm}
              onReset={resetFilters}
            />
          </div>
          <SortControl />
        </div>
        <span className="text-sm text-muted-foreground tabular-nums">
          {total.toLocaleString()}마리
        </span>
      </div>

      <div className="flex flex-col gap-8">
        <PokeCardList pokes={items} startIndex={startIndex} sortKey={sortKey} />
        <PokePagination
          page={page}
          totalPages={totalPages}
          onChange={goToPage}
        />
      </div>
    </div>
  );
}
