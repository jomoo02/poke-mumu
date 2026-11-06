import { paginate } from '@/_shared/lib/pagination';

import { PAGE_SIZE } from '../../config';
import type { BaseStatsPoke } from '../poke';
import { filterPokes, type PokeFilterValues } from '../filter';
import { filterPokesByKeyword } from '../search';
import { sortPokes, type PokeSort } from '../sort';

// 결과를 정하는 조건 (URL 상태를 해석한 값)
interface PokeConditions {
  // 선택지에 맞춰 해석한 필터 (parsePokeFilter)
  filter: PokeFilterValues;
  keyword: string;
  sortState: PokeSort;
  page: number;
}

interface PokeResults {
  pagePokes: BaseStatsPoke[];
  // 범위에 맞춘 페이지 (요청이 넘치면 마지막 페이지)
  page: number;
  totalPages: number;
  // 자르기 전 결과 수
  totalCount: number;
}

// 필터 → 검색 → 정렬 → 현재 페이지
const computePokeResults = (
  pokes: BaseStatsPoke[],
  { filter, keyword, sortState, page }: PokeConditions,
): PokeResults => {
  const filtered = filterPokes(pokes, filter);
  const searched = filterPokesByKeyword(filtered, keyword);
  const sorted = sortPokes(searched, sortState);
  const {
    items,
    page: shownPage,
    totalPages,
  } = paginate(sorted, page, PAGE_SIZE);

  return {
    pagePokes: items,
    page: shownPage,
    totalPages,
    totalCount: sorted.length,
  };
};

export type { PokeConditions, PokeResults };

export { computePokeResults };
