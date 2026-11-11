import { paginate } from '@/_shared/lib/pagination';

import { PAGE_SIZE } from '../../config';
import type { ListMove } from '../move';
import { filterMoves, type MoveFilterValues } from '../filter';
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
  };
};

export type { MoveConditions, MoveResults };

export { computeMoveResults };
