import { useDeferredValue, useMemo } from 'react';

import type { ListMove } from '../move';
import { useFilterParam } from '../filter';
import { useKeywordParam } from '../search';
import { useSortParam } from '../sort';
import { usePageParam } from '../url-state';
import {
  computeFilterCounts,
  computeMoveResults,
  type MoveConditions,
} from './move-results';

/**
 * 지금 URL 조건의 결과 (computeMoveResults).
 * 조건은 useDeferredValue로 늦춰 받는다. 검색어를 칠 때 입력창은 바로 바뀌고,
 * 목록은 뒤에서 다시 그려 다음 키 입력이 오면 버리고 새로 그린다
 */
export function useMoveResults(moves: ListMove[]) {
  const { keyword } = useKeywordParam();
  const { filter } = useFilterParam();
  const { sortState } = useSortParam();
  const { page } = usePageParam();

  // 검색어와 함께 page도 바뀌므로(1페이지로) 조건을 한 묶음으로 늦춘다
  const conditions = useMemo<MoveConditions>(
    () => ({ keyword, filter, sortState, page }),
    [keyword, filter, sortState, page],
  );

  const deferred = useDeferredValue(conditions);

  const results = useMemo(
    () => computeMoveResults(moves, deferred),
    [moves, deferred],
  );

  // 필터 선택지 옆 숫자 (정렬·페이지와 상관없어 검색어·필터가 바뀔 때만 센다)
  const filterCounts = useMemo(
    () =>
      computeFilterCounts(moves, {
        filter: deferred.filter,
        keyword: deferred.keyword,
      }),
    [moves, deferred.filter, deferred.keyword],
  );

  return { ...results, filterCounts };
}
