'use client';

import { useDeferredValue, useMemo } from 'react';

// 정리 전까지 전국도감 종족값(_pages/pokedex/national-base-stats)의 모델을 그대로 쓴다
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import {
  countMatchesInOtherLanguages,
  filterPokesByKeyword,
  usePokeSearch,
} from '@/_pages/pokedex/national-base-stats/model/poke-search';
import {
  filterPokes,
  usePokeFilter,
} from '@/_pages/pokedex/national-base-stats-v0/model/poke-filter';
import {
  sortPokes,
  usePokeSort,
} from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import { useNameLanguage } from '@/_pages/pokedex/national-base-stats/model/name-language';

/**
 * 포켓몬 목록 파생: 필터 → 검색(고른 이름 언어) → 정렬. 기존 usePokeResults에서 페이지 슬라이스만 뺐다.
 *
 * 목록은 조건의 지연 값(useDeferredValue)으로 계산한다. 조건이 바뀌면
 * 1) 먼저 머리글 화살표·결과 줄처럼 가벼운 부분만 새 조건으로 그려 바로 화면에 내고 (isPending: true)
 * 2) 행은 뒤에서 다시 그린다. 그사이 입력이 또 오면 버리고 새로 시작한다
 */
export function useAllPokeResults(pokes: BaseStatsPoke[]) {
  const { keyword } = usePokeSearch();

  const { filter } = usePokeFilter();

  const { sortState, toggleSort, selectKey, selectOrder } = usePokeSort();

  const { language, setLanguage } = useNameLanguage();

  // 조건을 한 값으로 묶어 함께 미룬다 (각각 미루면 서로 다른 시점의 조건이 섞일 수 있다)
  const query = useMemo(
    () => ({ keyword, filter, sortState, language }),
    [keyword, filter, sortState, language],
  );

  const deferredQuery = useDeferredValue(query);

  const isPending = query !== deferredQuery;

  // 각 단계를 memo해야 다음 단계의 의존성이 안정된다.
  // 필터를 먼저 해, 검색 결과가 없을 때 다른 언어 안내도 필터가 걸린 목록에서 센다
  const filtered = useMemo(
    () => filterPokes(pokes, deferredQuery.filter),
    [pokes, deferredQuery.filter],
  );

  const searched = useMemo(
    () =>
      filterPokesByKeyword(
        filtered,
        deferredQuery.keyword,
        deferredQuery.language,
      ),
    [filtered, deferredQuery.keyword, deferredQuery.language],
  );

  const sorted = useMemo(
    () => sortPokes(searched, deferredQuery.sortState, deferredQuery.language),
    [searched, deferredQuery.sortState, deferredQuery.language],
  );

  // 결과가 없을 때만 센다: 고른 언어로는 없지만 다른 언어 이름으로는 찾히는 수
  const otherLanguageMatches = useMemo(
    () =>
      sorted.length === 0
        ? countMatchesInOtherLanguages(
            filtered,
            deferredQuery.keyword,
            deferredQuery.language,
          )
        : [],
    [sorted.length, filtered, deferredQuery.keyword, deferredQuery.language],
  );

  return {
    pokes: sorted,
    // 지금 고른 정렬 (머리글·정렬 시트)
    sortState,
    // 지금 보이는 행의 정렬 (정렬 중인 열 칠하기)
    shownSortState: deferredQuery.sortState,
    // 지금 보이는 행의 이름 언어
    shownLanguage: deferredQuery.language,
    isPending,
    // 넓은 본문 머리글: 같은 기준이면 방향 반전
    toggleSort,
    // 정렬 시트: 기준 칸(그 기준의 첫 방향부터) / 방향 칸
    selectKey,
    selectOrder,
    // 빈 결과의 '다른 언어로 보기'
    setLanguage,
    otherLanguageMatches,
  };
}
