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
import { DEFAULT_SORT_DIR, DEFAULT_SORT_KEY, parseSort } from '../model/sort';
import TypeFilter from './type-filter';
import FormFilter from './form-filter';
import PokeSort from './poke-sort';
import PokedexPagination from './pokedex-pagination';
import { Button } from '@/shared/ui/button';
import { RotateCwIcon } from 'lucide-react';

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
  const { searchParams, update } = useSearchParamsState();
  const { input, setInput, deferredInput } = useSearchQuery(
    searchParams.get('search') ?? '',
  );
  const { items, page, totalPages, total, startIndex } = usePagination(
    pokes,
    deferredInput,
  );
  const { key: sortKey, dir: sortDir } = parseSort(searchParams);

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

  // 검색어를 디바운스 + replace로 URL(search)에 반영한다.
  // 결과는 deferredInput(로컬)로 즉시 필터링하고, URL은 공유·새로고침 복원용.
  // replace라 타이핑이 히스토리에 쌓이지 않는다.
  useEffect(() => {
    const current = searchParams.get('search') ?? '';
    if (input === current) return; // 초기 mount & 이미 반영된 경우 skip

    const timer = setTimeout(() => update({ search: input || null }), 250);
    return () => clearTimeout(timer);
  }, [input, searchParams, update]);

  // 초기화 버튼 활성 판정용(필터/정렬 중 하나라도 기본값이 아니면).
  // 반복 키(type=a&type=b)이므로 getAll로 읽는다.
  const isActive =
    searchParams.getAll('type').filter(Boolean).length > 0 ||
    searchParams.getAll('form').filter(Boolean).length > 0 ||
    sortKey !== DEFAULT_SORT_KEY ||
    sortDir !== DEFAULT_SORT_DIR;

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

  const handleResetClick = () => {
    update({ form: null, type: null, sort: null, dir: null });
  };

  // 빈 상태 회복용: 필터·정렬 + 검색어까지 모두 초기화.
  // (검색만으로 0개인 경우도 회복되도록 검색 포함)
  const handleResetAll = () => {
    setInput('');
    update({ form: null, type: null, sort: null, dir: null, search: null });
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

  const resultText =
    pokes.length !== total
      ? `${total.toLocaleString()} of ${pokes.length.toLocaleString()} Pokémon`
      : `${pokes.length.toLocaleString()} Pokémon`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:gap-6">
        <SearchInput value={input} onChange={handleSearchInputChange} />
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center">
          <div className="flex gap-2 overflow-auto">
            {isActive && (
              <Button
                variant={'secondary'}
                aria-label="필터 및 정렬 초기화"
                className="size-10.5 bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input"
                onClick={handleResetClick}
              >
                <RotateCwIcon className="size-4.5" />
              </Button>
            )}

            <TypeFilter types={types} />
            <FormFilter />
            <PokeSort />
          </div>
          <div
            aria-live="polite"
            className="text-sm text-foreground/70 shrink-0"
          >
            {resultText}
          </div>
        </div>
      </div>

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
          onReset={handleResetAll}
        />
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
