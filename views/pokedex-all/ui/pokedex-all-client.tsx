'use client';

import type { Type } from '@/entities/type/model';

import type { NationalPoke } from '../model/poke';
import {
  NavigationTransitionProvider,
  useNavigationTransition,
  useSearchParamsState,
} from '../model/search-params';
import { parseSort } from '../model/poke-sort';
import { isFilterOrSortActive } from '../model/toolbar-active';
import { usePagination, useGoToPage } from '../model/pagination';
import { usePokeSearch } from '../model/poke-search';
import useDelayedFlag from '../model/useDelayedFlag';

import PokedexToolbar from './toolbar';
import Pagination from './pagination';
import PokeList from './poke-list';

interface PokedexAllClientProps {
  pokes: NationalPoke[];
  types: Type[];
}

const FILTER_SORT_RESET = { type: null, form: null, sort: null, dir: null };

// Provider 경계. 안쪽 컴포넌트들이 공유 transition(isPending)을 함께 사용한다.
export default function PokedexAllClient(props: PokedexAllClientProps) {
  return (
    <NavigationTransitionProvider>
      <PokedexAllClientInner {...props} />
    </NavigationTransitionProvider>
  );
}

function PokedexAllClientInner({ pokes, types }: PokedexAllClientProps) {
  const { searchParams, setParams } = useSearchParamsState();
  const { sortKey } = parseSort(searchParams);

  const { input, deferredInput, onInputChange, clearSearch } = usePokeSearch();

  const { pagePokes, page, totalPages, filteredCount, startIndex } =
    usePagination(pokes, deferredInput);

  // 네비게이션 전환만 dim(검색은 useDeferredValue가 처리). 150ms 이상일 때만 표시.
  const { isPending } = useNavigationTransition();
  const isDimmed = useDelayedFlag(isPending, 150);

  // 초기화 버튼 활성 판정(필터/정렬 중 하나라도 기본값이 아니면).
  const isActive = isFilterOrSortActive(searchParams);

  // 툴바 초기화: 필터/정렬만 (검색은 입력창 X가 담당).
  const handleResetFilters = () => setParams(FILTER_SORT_RESET);

  // 빈 상태 회복: 필터/정렬 + 검색까지 모두 초기화.
  const handleResetAll = () => {
    clearSearch();
    setParams({ ...FILTER_SORT_RESET, search: null });
  };

  const goToPage = useGoToPage(page);

  const resultText =
    pokes.length !== filteredCount
      ? `${filteredCount.toLocaleString()} of ${pokes.length.toLocaleString()} Pokémon`
      : `${pokes.length.toLocaleString()} Pokémon`;

  return (
    <div className="flex flex-col gap-6">
      <PokedexToolbar
        searchValue={input}
        onSearchChange={onInputChange}
        types={types}
        isActive={isActive}
        onResetFilters={handleResetFilters}
        resultText={resultText}
      />
      <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      <PokeList
        filteredCount={filteredCount}
        isDimmed={isDimmed}
        pagePokes={pagePokes}
        startIndex={startIndex}
        sortKey={sortKey}
        onResetAll={handleResetAll}
      />
      <div className="mt-4">
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      </div>
    </div>
  );
}
