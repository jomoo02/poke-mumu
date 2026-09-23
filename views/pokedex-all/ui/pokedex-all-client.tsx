'use client';

import type { Type } from '@/entities/type/model';
import { useSearchParamsInput } from '@/shared/model/search-params-input';

import type { NationalPoke } from '../model/poke';
import {
  NavigationTransitionProvider,
  useNavigationTransition,
  useSearchParamsState,
} from '../model/search-params';
import { parseSort } from '../model/poke-sort';
import { isFilterOrSortActive } from '../model/toolbar-active';
import { usePagination, useGoToPage } from '../model/pagination';
import useDelayedFlag from '../model/useDelayedFlag';

import PokedexToolbar from './toolbar';
import Pagination from './pagination';
import PokeList from './poke-list';
import PaginationV2 from './pagination-v2';

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

  // 검색이 바뀌면 페이지를 1로 되돌린다(resetKeys).
  const { value, onChange, onCompositionEnd, clear } = useSearchParamsInput({
    resetKeys: ['page'],
  });

  // 목록은 URL을 읽어 거른다. 로컬값(deferredValue)으로 거르면 한글 조합 중
  // 낱자 상태까지 그대로 반영돼 목록이 깜빡인다. 훅이 낱자로 끝나는 값을
  // 커밋하지 않으므로, URL을 읽어야 그 필터링 효과를 받는다.
  const { pagePokes, page, totalPages, filteredCount, startIndex } =
    usePagination(pokes, searchParams.get('search') ?? '');

  // 네비게이션 전환만 dim(검색은 useDeferredValue가 처리). 150ms 이상일 때만 표시.
  const { isPending } = useNavigationTransition();
  const isDimmed = useDelayedFlag(isPending, 150);

  // 초기화 버튼 활성 판정(필터/정렬 중 하나라도 기본값이 아니면).
  const isActive = isFilterOrSortActive(searchParams);

  // 툴바 초기화: 필터/정렬만 (검색은 입력창 X가 담당).
  const handleResetFilters = () => setParams(FILTER_SORT_RESET);

  // 빈 상태 회복: 필터/정렬 + 검색까지 모두 초기화.
  // clear()가 search를 즉시 지우므로 setParams에서 search를 다룰 필요가 없다.
  const handleResetAll = () => {
    clear();
    setParams(FILTER_SORT_RESET);
  };

  const goToPage = useGoToPage(page);

  const resultText =
    pokes.length !== filteredCount
      ? `${filteredCount.toLocaleString()} of ${pokes.length.toLocaleString()} Pokémon`
      : `${pokes.length.toLocaleString()} Pokémon`;

  return (
    <div className="flex flex-col gap-6">
      <PokedexToolbar
        searchValue={value}
        onSearchChange={onChange}
        onSearchCompositionEnd={onCompositionEnd}
        onSearchClear={clear}
        types={types}
        isActive={isActive}
        onResetFilters={handleResetFilters}
        resultText={resultText}
      />
      <PaginationV2 page={page} totalPages={totalPages} onChange={goToPage} />
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
