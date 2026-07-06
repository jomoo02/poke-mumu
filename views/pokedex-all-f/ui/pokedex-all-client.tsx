'use client';

import { useLayoutEffect, useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import type { Type } from '@/entities/type/model';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';
import { useIsMobile } from '@/shared/model/useMobile';

import type { NationalPoke } from '../model/poke';
import {
  NavigationTransitionProvider,
  useNavigationTransition,
  useSearchParamsState,
} from '../model/search-params';
import {
  DEFAULT_SORT_DIR,
  DEFAULT_SORT_KEY,
  parseSort,
} from '../model/poke-sort';
import { usePagination } from '../model/pagination';
import { useSearch } from '../model/search';
import useDelayedFlag from '../model/useDelayedFlag';

import SearchInput from './search';
import TypeFilter from './type-filter';
import FormFilter from './form-filter';
import PokeSort from './poke-sort';
import PokeCardList from './poke-card-list';
import Pagination from './pagination';

interface PokedexAllClientProps {
  pokes: NationalPoke[];
  types: Type[];
}

// Provider 경계. 안쪽 컴포넌트들이 공유 transition(isPending)을 함께 사용한다.
export default function PokedexAllClient(props: PokedexAllClientProps) {
  return (
    <NavigationTransitionProvider>
      <PokedexAllClientInner {...props} />
    </NavigationTransitionProvider>
  );
}

function PokedexAllClientInner({ pokes, types }: PokedexAllClientProps) {
  const isMobile = useIsMobile(768);
  const { searchParams, update } = useSearchParamsState();
  const { key: sortKey, dir: sortDir } = parseSort(searchParams);

  const { input, deferredInput, onInputChange, clearSearch } = useSearch();

  const { items, page, totalPages, total, startIndex } = usePagination(
    pokes,
    deferredInput,
  );

  // 네비게이션 전환만 dim(검색은 useDeferredValue가 처리). 150ms 이상일 때만 표시.
  const { isPending } = useNavigationTransition();
  const isDimmed = useDelayedFlag(isPending, 150);

  // 초기화 버튼 활성 판정(필터/정렬 중 하나라도 기본값이 아니면).
  const isActive =
    searchParams.getAll('type').filter(Boolean).length > 0 ||
    searchParams.getAll('form').filter(Boolean).length > 0 ||
    sortKey !== DEFAULT_SORT_KEY ||
    sortDir !== DEFAULT_SORT_DIR;

  // 툴바 초기화: 필터/정렬만 (검색은 입력창 X가 담당).
  const handleResetFilters = () => {
    update({ type: null, form: null, sort: null, dir: null });
  };

  // 빈 상태 회복: 필터/정렬 + 검색까지 모두 초기화.
  const handleResetAll = () => {
    clearSearch();
    update({ type: null, form: null, sort: null, dir: null, search: null });
  };

  // 페이지네이션 클릭일 때만, 페이지 커밋 후 최상단으로 스크롤.
  const pendingScrollRef = useRef(false);

  const goToPage = (nextPage: number) => {
    pendingScrollRef.current = true;
    update(
      { page: nextPage > 1 ? String(nextPage) : null },
      { resetPage: false, history: 'push' },
    );
  };

  useLayoutEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    window.scrollTo({ top: 0 });
  }, [page]);

  const resultText =
    pokes.length !== total
      ? `${total.toLocaleString()} of ${pokes.length.toLocaleString()} Pokémon`
      : `${pokes.length.toLocaleString()} Pokémon`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:gap-6">
        <SearchInput value={input} onChange={onInputChange} />
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center">
          <div className="flex gap-2 overflow-auto py-1">
            {isActive && (
              <Button
                variant={'secondary'}
                aria-label="필터 및 정렬 초기화"
                className="size-10.5 bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input"
                onClick={handleResetFilters}
              >
                <RotateCwIcon className="size-4.5" />
              </Button>
            )}

            <TypeFilter types={types} isMobile={isMobile} />
            <FormFilter isMobile={isMobile} />
            <PokeSort isMobile={isMobile} />
          </div>
          <div
            aria-live="polite"
            className="text-sm text-foreground/70 shrink-0"
          >
            {resultText}
          </div>
        </div>
      </div>

      {total === 0 ? (
        <div className="h-50 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <p>조건에 맞는 포켓몬이 없습니다.</p>
          <Button variant="outline" onClick={handleResetAll} className="gap-2">
            <RotateCwIcon className="size-4" />
            필터·검색 초기화
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            'transition-opacity duration-200',
            isDimmed && 'opacity-60',
          )}
          aria-busy={isDimmed}
        >
          <PokeCardList
            pokes={items}
            startIndex={startIndex}
            sortKey={sortKey}
          />
        </div>
      )}

      <div className="mt-6">
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      </div>
    </div>
  );
}
