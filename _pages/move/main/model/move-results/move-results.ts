import { paginate } from '@/_shared/lib/pagination';

import { PAGE_SIZE } from '../../config';
import type { ListMove } from '../move';
import {
  MOVE_FILTER_RULES,
  filterMoves,
  mapFilterGroups,
  type MoveFilterGroup,
  type MoveFilterValues,
} from '../filter';
import { filterMovesByKeyword } from '../search';
import { sortMoves, type MoveSort } from '../sort';

// 결과를 정하는 조건 (URL 상태를 해석한 값)
interface MoveConditions {
  // 선택지에 맞춰 해석한 필터 (parseMoveFilter)
  filter: MoveFilterValues;
  keyword: string;
  sortState: MoveSort;
  page: number;
}

interface MoveResults {
  pageMoves: ListMove[];
  // 범위에 맞춘 페이지 (요청이 넘치면 마지막 페이지)
  page: number;
  totalPages: number;
  // 자르기 전 결과 수
  totalCount: number;
  // 검색할 범위: 필터만 건 수 (검색창 안내 '기술 400개 중 검색')
  scopeCount: number;
}

// 필터 → 검색 → 정렬 → 현재 페이지
const computeMoveResults = (
  moves: ListMove[],
  { filter, keyword, sortState, page }: MoveConditions,
): MoveResults => {
  const filtered = filterMoves(moves, filter);
  const searched = filterMovesByKeyword(filtered, keyword);
  const sorted = sortMoves(searched, sortState);
  const {
    items,
    page: shownPage,
    totalPages,
  } = paginate(sorted, page, PAGE_SIZE);

  return {
    pageMoves: items,
    page: shownPage,
    totalPages,
    totalCount: sorted.length,
    scopeCount: filtered.length,
  };
};

// 필터 선택지별 결과 수: 그룹 → 값 → 기술 수 (없는 값은 0)
type MoveFilterCounts = Record<MoveFilterGroup, Record<string, number>>;

// 선택지 옆 숫자. 그 값을 고르면(그룹 안은 그 값 하나만) 나올 기술 수:
// 검색어 + 다른 그룹의 필터는 걸고, 자기 그룹의 필터는 뺀다
// (그룹 안은 OR라 자기 그룹까지 걸면 고르지 않은 값이 모두 0이 된다)
const computeFilterCounts = (
  moves: ListMove[],
  { filter, keyword }: Pick<MoveConditions, 'filter' | 'keyword'>,
): MoveFilterCounts => {
  const searched = filterMovesByKeyword(moves, keyword);

  return mapFilterGroups((group) => {
    const others = filterMoves(searched, { ...filter, [group]: [] });
    const counts: Record<string, number> = {};

    for (const move of others) {
      for (const value of MOVE_FILTER_RULES[group].getMoveValues(move)) {
        counts[value] = (counts[value] ?? 0) + 1;
      }
    }

    return counts;
  });
};

export type { MoveConditions, MoveResults, MoveFilterCounts };

export { computeMoveResults, computeFilterCounts };
