import { paginate } from '@/_shared/lib/pagination';

import type { BaseStatsPoke } from '../base-stats-poke';
import type { NameLanguage } from '../name-language';
import { filterPokes, type PokeFilterValues } from '../filter';
import {
  countMatchesInOtherLanguages,
  filterPokesByKeyword,
} from '../search';
import { sortPokes, type PokeSort } from '../sort';

// 목록을 정하는 조건 (URL 상태에서 읽은 유효한 값)
interface ResultConditions {
  keyword: string;
  filter: PokeFilterValues;
  sortState: PokeSort;
  language: NameLanguage;
  page: number;
}

interface Results {
  // 현재 페이지 포켓몬
  pagePokes: BaseStatsPoke[];
  // 총 페이지 수에 맞춘 현재 페이지
  page: number;
  totalPages: number;
  totalCount: number;
  // 결과가 없을 때만: 고른 언어로는 없지만 다른 언어 이름으로는 찾히는 수
  otherLanguageMatches: { language: NameLanguage; count: number }[];
}

/**
 * 포켓몬 목록 파생: 필터 → 검색(고른 이름 언어) → 정렬 → 현재 페이지 슬라이스.
 * 필터를 먼저 해, 검색 결과가 없을 때 다른 언어 안내도 필터가 걸린 목록에서 센다
 */
const deriveResults = (
  pokes: BaseStatsPoke[],
  { keyword, filter, sortState, language, page }: ResultConditions,
  pageSize: number,
): Results => {
  const filtered = filterPokes(pokes, filter);
  const searched = filterPokesByKeyword(filtered, keyword, language);
  const sorted = sortPokes(searched, sortState, language);
  const { items, page: shownPage, totalPages } = paginate(
    sorted,
    page,
    pageSize,
  );

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

export type { ResultConditions, Results };

export { deriveResults };
