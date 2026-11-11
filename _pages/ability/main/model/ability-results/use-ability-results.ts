import { useDeferredValue, useMemo } from 'react';

import type { ListAbility } from '../ability';
import { useKeywordParam } from '../search';
import { useSortParam } from '../sort';
import { usePageParam } from '../url-state';
import {
  computeAbilityResults,
  type AbilityConditions,
} from './ability-results';

/**
 * 지금 URL 조건의 결과 (computeAbilityResults).
 * 조건은 useDeferredValue로 늦춰 받는다. 검색어를 칠 때 입력창은 바로 바뀌고,
 * 목록은 뒤에서 다시 그려 다음 키 입력이 오면 버리고 새로 그린다
 */
export function useAbilityResults(abilities: ListAbility[]) {
  const { keyword } = useKeywordParam();
  const { sortState } = useSortParam();
  const { page } = usePageParam();

  // 검색어와 함께 page도 바뀌므로(1페이지로) 조건을 한 묶음으로 늦춘다
  const conditions = useMemo<AbilityConditions>(
    () => ({ keyword, sortState, page }),
    [keyword, sortState, page],
  );

  const deferred = useDeferredValue(conditions);

  return useMemo(
    () => computeAbilityResults(abilities, deferred),
    [abilities, deferred],
  );
}
