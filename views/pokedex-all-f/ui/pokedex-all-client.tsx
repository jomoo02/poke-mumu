'use client';

import { useLayoutEffect, useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import type { Type } from '@/entities/type/model';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';
import { useIsMobile } from '@/shared/model/useMobile';
import { useScrollIntoViewOnClick } from '@/shared/model/useScrollIntoViewOnClick';
import { useScrollIntoViewOnResize } from '@/shared/model/useScrollIntoViewOnResize';

import type { NationalPoke } from '../model/poke';
import {
  NavigationTransitionProvider,
  useNavigationTransition,
  useSearchParamsState,
} from '../model/search-params';
import { parseSort } from '../model/poke-sort';
import { isFilterOrSortActive } from '../model/toolbar-active';
import { usePagination } from '../model/pagination';
import { usePokeSearch } from '../model/poke-search';
import useDelayedFlag from '../model/useDelayedFlag';

import PokeSearchInput from './poke-search';
import TypeFilter from './type-filter';
import FormFilter from './form-filter';
import PokeSort from './poke-sort';
import PokeCardList from './poke-card-list';
import Pagination from './pagination';

interface PokedexAllClientProps {
  pokes: NationalPoke[];
  types: Type[];
}

// 필터/정렬 초기화 시 제거할 파라미터 집합(검색 제외).
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
  const isMobile = useIsMobile(768);
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
  const handleResetFilters = () => {
    setParams(FILTER_SORT_RESET);
  };

  // 빈 상태 회복: 필터/정렬 + 검색까지 모두 초기화.
  const handleResetAll = () => {
    clearSearch();
    setParams({ ...FILTER_SORT_RESET, search: null });
  };

  // 페이지네이션 클릭일 때만, 페이지 커밋 후 최상단으로 스크롤.
  const pendingScrollRef = useRef(false);

  const goToPage = (nextPage: number) => {
    pendingScrollRef.current = true;
    setParams(
      { page: nextPage > 1 ? String(nextPage) : null },
      { keepPage: true, history: 'push' },
    );
  };

  useLayoutEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    window.scrollTo({ top: 0 });
  }, [page]);

  const resultText =
    pokes.length !== filteredCount
      ? `${filteredCount.toLocaleString()} of ${pokes.length.toLocaleString()} Pokémon`
      : `${pokes.length.toLocaleString()} Pokémon`;

  // 모바일: 가로 스크롤 툴바에서 탭한 trigger(pill)를 가운데로 스크롤해 완전히 보이게.
  const toolbarRef = useRef<HTMLDivElement>(null);
  const scrollTriggerIntoView = useScrollIntoViewOnClick({
    enabled: isMobile,
    inline: 'center',
    selector: '[data-scroll-item]',
  });
  // 선택으로 trigger 텍스트가 길어져 잘리면, 너비 확정 시 다시 보이게 맞춘다.
  useScrollIntoViewOnResize(toolbarRef, {
    enabled: isMobile,
    selector: '[data-scroll-item]',
    inline: 'nearest',
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:gap-6">
        <PokeSearchInput value={input} onChange={onInputChange} />
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center">
          <div
            ref={toolbarRef}
            className="flex gap-2 overflow-auto p-1 -m-1"
            onClick={scrollTriggerIntoView}
          >
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
            <PokeSort isMobile={isMobile} />
            <TypeFilter types={types} isMobile={isMobile} />
            <FormFilter isMobile={isMobile} />
          </div>
          <div
            aria-live="polite"
            className="text-sm text-foreground/70 shrink-0"
          >
            {resultText}
          </div>
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={goToPage} />

      <div className="min-h-50 md:min-h-78">
        {filteredCount === 0 ? (
          <div className="h-50 md:h-78 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <p>조건에 맞는 포켓몬이 없습니다.</p>
            <Button
              variant="outline"
              onClick={handleResetAll}
              className="gap-2"
            >
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
              pokes={pagePokes}
              startIndex={startIndex}
              sortKey={sortKey}
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      </div>
    </div>
  );
}
