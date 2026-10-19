'use client';

import { useDeferredValue, useMemo } from 'react';

// 정리 전까지 전국도감 종족값(_pages/pokedex/national-base-stats)의 모델을 그대로 쓴다
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import {
  filterPokesByKeyword,
  usePokeSearch,
} from '@/_pages/pokedex/national-base-stats/model/poke-search';
import {
  filterPokes,
  usePokeFilter,
} from '@/_pages/pokedex/national-base-stats/model/poke-filter';
import {
  sortPokes,
  usePokeSort,
} from '@/_pages/pokedex/national-base-stats/model/poke-sort';

/**
 * 포켓몬 목록 파생: 검색 → 필터 → 정렬. 기존 usePokeResults에서 페이지 슬라이스만 뺐다.
 *
 * 목록은 조건의 지연 값(useDeferredValue)으로 계산한다. 조건이 바뀌면
 * 1) 먼저 머리글 화살표·결과 줄처럼 가벼운 부분만 새 조건으로 그려 바로 화면에 내고 (isPending: true)
 * 2) 전체 행(약 1,250개)은 뒤에서 다시 그린다. 그사이 입력이 또 오면 버리고 새로 시작한다
 * 그래서 누른 뒤 첫 반응은 행 수와 관계없이 바로 보인다 (pokemondb가 정렬 전에 표를 흐리게 그리는 것과 같은 효과)
 */
export function useAllPokeResults(pokes: BaseStatsPoke[]) {
  const { keyword } = usePokeSearch();

  const { filter } = usePokeFilter();

  const { sortState, toggleSort } = usePokeSort();

  // 조건 셋을 한 값으로 묶어 함께 미룬다 (각각 미루면 서로 다른 시점의 조건이 섞일 수 있다)
  const query = useMemo(
    () => ({ keyword, filter, sortState }),
    [keyword, filter, sortState],
  );

  const deferredQuery = useDeferredValue(query);

  const isPending = query !== deferredQuery;

  // 각 단계를 memo해야 다음 단계의 의존성이 안정된다
  const searched = useMemo(
    () => filterPokesByKeyword(pokes, deferredQuery.keyword),
    [pokes, deferredQuery.keyword],
  );

  const filtered = useMemo(
    () => filterPokes(searched, deferredQuery.filter),
    [searched, deferredQuery.filter],
  );

  const sorted = useMemo(
    () => sortPokes(filtered, deferredQuery.sortState),
    [filtered, deferredQuery.sortState],
  );

  return {
    pokes: sorted,
    // 지금 고른 정렬 (머리글·번호 정렬 버튼)
    sortState,
    // 지금 보이는 행의 정렬 (정렬 중인 열 칠하기)
    shownSortState: deferredQuery.sortState,
    isPending,
    toggleSort,
  };
}
