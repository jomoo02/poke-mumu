import { paginate } from '@/_shared/lib/pagination';

import { PAGE_SIZE } from '../../config';
import type { ListAbility } from '../ability';
import { filterAbilitiesByKeyword } from '../search';
import { sortAbilities, type AbilitySort } from '../sort';

// 결과를 정하는 조건 (URL 상태를 해석한 값)
interface AbilityConditions {
  keyword: string;
  sortState: AbilitySort;
  page: number;
}

interface AbilityResults {
  pageAbilities: ListAbility[];
  // 범위에 맞춘 페이지 (요청이 넘치면 마지막 페이지)
  page: number;
  totalPages: number;
  // 자르기 전 결과 수
  totalCount: number;
}

// 검색 → 정렬 → 현재 페이지
const computeAbilityResults = (
  abilities: ListAbility[],
  { keyword, sortState, page }: AbilityConditions,
): AbilityResults => {
  const searched = filterAbilitiesByKeyword(abilities, keyword);
  const sorted = sortAbilities(searched, sortState);
  const {
    items,
    page: shownPage,
    totalPages,
  } = paginate(sorted, page, PAGE_SIZE);

  return {
    pageAbilities: items,
    page: shownPage,
    totalPages,
    totalCount: sorted.length,
  };
};

export type { AbilityConditions, AbilityResults };

export { computeAbilityResults };
