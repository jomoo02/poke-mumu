'use client';

import { useMemo } from 'react';

// 비교용 테스트 페이지라 전국도감 종족값(_pages/pokedex/national-base-stats)의 모델을 그대로 가져다 쓴다
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
 * 전체(폼 포함)를 가상화 테이블이 한 번에 받는다
 */
export function useAllPokeResults(pokes: BaseStatsPoke[]) {
  const { keyword } = usePokeSearch();

  const { filter } = usePokeFilter();

  const { sortState, toggleSort } = usePokeSort();

  // 각 단계를 memo해야 다음 단계의 의존성이 안정된다
  const searched = useMemo(
    () => filterPokesByKeyword(pokes, keyword),
    [pokes, keyword],
  );

  const filtered = useMemo(
    () => filterPokes(searched, filter),
    [searched, filter],
  );

  const sorted = useMemo(
    () => sortPokes(filtered, sortState),
    [filtered, sortState],
  );

  return { pokes: sorted, sortState, toggleSort };
}
