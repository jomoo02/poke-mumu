'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

import type { Type } from '@/entities/type/model';
import { cn } from '@/shared/lib/cn';

import useSearchParamsState from '../model/useSearchParamsState';
import usePagination from '../model/usePagination';
import useSearchQuery from '../model/useSearchQuery';
import useDelayedFlag from '../model/useDelayedFlag';
import { NavigationProvider, useNavigation } from '../model/navigation';
import type { NationalPoke } from '../model/poke';
import SearchInput from './search-input';
import PokeCardList from './poke-card-list.tsx';
import { parseSort } from '../model/sort';
import TypeFilter from './type-filter';
import FormFilter from './form-filter';
import PokeSort from './poke-sort';
import PokedexPagination from './pokedex-pagination';

interface PokedexViewProps {
  pokes: NationalPoke[];
  types: Type[];
}

// Provider 경계. 안쪽 컴포넌트들이 공유 transition(isPending)을 함께 사용한다.
export default function PokedexView(props: PokedexViewProps) {
  return (
    <NavigationProvider>
      <PokedexViewInner {...props} />
    </NavigationProvider>
  );
}

function PokedexViewInner({ pokes, types }: PokedexViewProps) {
  const { searchParams, update, toggle } = useSearchParamsState();
  const { input, setInput, deferredInput } = useSearchQuery();
  const { items, page, totalPages, total, startIndex } = usePagination(
    pokes,
    deferredInput,
  );
  const { key: sortKey } = parseSort(searchParams);

  // 네비게이션(필터·정렬·페이지) 전환만 dim. 검색은 useDeferredValue가 처리하므로 제외.
  // 150ms 이상 지속될 때만 표시해 빠른 전환의 flash를 막는다.
  const { isPending } = useNavigation();
  const isDimmed = useDelayedFlag(isPending, 150);

  const handleSearchInputChange = (value: string) => {
    setInput(value);

    if (searchParams.get('page')) {
      update({});
    }
  };

  // 반복 키(type=a&type=b) 형태이므로 getAll로 읽는다.
  const selectedTypes = searchParams.getAll('type').filter(Boolean);
  const selectedForms = searchParams.getAll('form').filter(Boolean);

  const handleTypeToggle = (id: string) => toggle('type', id);
  const handleTypeReset = () => update({ type: null });

  const handleFormToggle = (id: string) => toggle('form', id);
  const handleFormReset = () => update({ form: null });

  // 페이지네이션 클릭일 때만 스크롤하도록 의도를 표시한다.
  // (필터로 인한 page 리셋에는 스크롤하지 않기 위함)
  const pendingScrollRef = useRef(false);

  const goToPage = (p: number) => {
    pendingScrollRef.current = true;
    update(
      { page: p > 1 ? String(p) : null },
      { resetPage: false, history: 'push' },
    );
  };

  // 새 페이지가 '커밋된 뒤'(page 변경 후)에만 최상단으로 스크롤한다.
  // rAF로 미리 스크롤하면 transition이 옛 아이템을 유지하는 동안 화면만 먼저
  // 올라가 "위로 간 뒤 늦게 아이템 교체"로 보이므로, 순서를 뒤집어
  // "아이템 교체 → 최상단 착지"가 되게 한다.
  useLayoutEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    window.scrollTo({ top: 0 });
  }, [page]);

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

      <div
        className={cn(
          'transition-opacity duration-200',
          isDimmed && 'opacity-60',
        )}
        aria-busy={isDimmed}
      >
        <PokeCardList pokes={items} startIndex={startIndex} sortKey={sortKey} />
      </div>

      <div className="mt-6">
        <PokedexPagination
          page={page}
          totalPages={totalPages}
          onChange={goToPage}
        />
      </div>
    </div>
  );
}
