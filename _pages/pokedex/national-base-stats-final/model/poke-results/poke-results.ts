import { paginate } from '@/_shared/lib/pagination';

import { PAGE_SIZE } from '../../config';
import type { BaseStatsPoke } from '../base-stats-poke';
import { filterPokes, type PokeFilterValues } from '../filter';
import type { NameLanguage } from '../name-language';
import { countMatchesInOtherLanguages, filterPokesByKeyword } from '../search';
import { sortPokes, type PokeSort } from '../sort';

// 결과를 정하는 조건 (URL 상태를 해석한 값)
interface PokeConditions {
  // 선택지에 맞춰 해석한 필터 (parsePokeFilter)
  filter: PokeFilterValues;
  keyword: string;
  language: NameLanguage;
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
  // 결과가 없을 때만: 고른 언어로는 없지만 다른 언어 이름으로는 찾히는 수
  otherLanguageMatches: { language: NameLanguage; count: number }[];
}

/**
 * 필터 → 검색(고른 이름 언어) → 정렬 → 현재 페이지.
 * 다른 언어로 찾히는 수는 필터만 거친 목록에서 센다 (검색만 언어를 바꿔 보는 안내라서)
 */
const computePokeResults = (
  pokes: BaseStatsPoke[],
  { filter, keyword, language, sortState, page }: PokeConditions,
): PokeResults => {
  const filtered = filterPokes(pokes, filter);
  const searched = filterPokesByKeyword(filtered, keyword, language);
  const sorted = sortPokes(searched, sortState, language);
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
    otherLanguageMatches:
      sorted.length === 0
        ? countMatchesInOtherLanguages(filtered, keyword, language)
        : [],
  };
};

export type { PokeConditions, PokeResults };

export { computePokeResults };
