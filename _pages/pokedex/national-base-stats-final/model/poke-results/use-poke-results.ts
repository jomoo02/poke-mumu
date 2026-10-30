import { useDeferredValue, useMemo } from 'react';

import type { BaseStatsPoke } from '../base-stats-poke';
import { useFilterParam } from '../filter';
import { useLanguageParam } from '../name-language';
import { useKeywordParam } from '../search';
import { useSortParam } from '../sort';
import { usePageParam } from '../url-state';
import { computePokeResults, type PokeConditions } from './poke-results';

/**
 * 지금 URL 조건의 결과 (computePokeResults).
 * 조건은 useDeferredValue로 늦춰 받는다. 검색어를 칠 때 입력창은 바로 바뀌고,
 * 목록(카드·표 한 페이지)은 뒤에서 다시 그려 다음 키 입력이 오면 버리고 새로 그린다
 */
export function usePokeResults(pokes: BaseStatsPoke[]) {
  const { keyword } = useKeywordParam();
  const { filter } = useFilterParam();
  const { sortState } = useSortParam();
  const { language } = useLanguageParam();
  const { page } = usePageParam();

  // 검색어와 함께 page도 바뀌므로(1페이지로) 조건을 한 묶음으로 늦춘다
  const conditions = useMemo<PokeConditions>(
    () => ({ keyword, filter, sortState, language, page }),
    [keyword, filter, sortState, language, page],
  );

  const deferred = useDeferredValue(conditions);

  return useMemo(() => computePokeResults(pokes, deferred), [pokes, deferred]);
}
