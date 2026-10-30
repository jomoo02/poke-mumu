import { useMemo } from 'react';

import { useListQueryStates } from '../url-state';
import type { PokeFilterGroup } from './filter-option';
import { useFilterOptions } from './filter-options-context';
import {
  isPokeFilterActive,
  parsePokeFilter,
  toggleGroupValue,
} from './filter-pokes';
import {
  FILTER_RESET_PATCH,
  filterSearchParams,
} from './filter-search-params';

/**
 * 필터 (?type=fire,flying&form=alola&gen=1). 선택지는 FilterOptionsProvider에서 읽는다.
 * - filter: 목록 계산·트리거가 쓰는 유효한 선택 (options에 있는 값만, 그룹 안은 고른 순서)
 * - toggleFilter·resetFilterGroup: 바꾼 그룹의 키만 쓴다
 *   (키가 제자리를 지켜 URL의 키 순서가 처음 고른 순서로 남는다)
 * - resetFilters: 필터 키 모두. 페이지의 초기화는 이것뿐이다 (검색어·이름 언어는 둔다)
 */
export function useFilterParam() {
  const options = useFilterOptions();
  const [values, write] = useListQueryStates(filterSearchParams);

  const filter = useMemo(
    () => parsePokeFilter(values, options),
    [values, options],
  );

  // ?type=foo 같은 잘못된 값만 있으면 목록도 전체라 켜진 필터가 없다
  const isFilterActive = isPokeFilterActive(filter);

  const toggleFilter = (group: PokeFilterGroup, value: string) =>
    write((prev) => ({
      [group]: toggleGroupValue(prev[group], value, group, options),
    }));

  const resetFilterGroup = (group: PokeFilterGroup) =>
    write({ [group]: null });

  // 이미 처음 상태면 URL을 다시 쓰지 않는다 (잘못된 값만 남은 URL도 그대로 둔다)
  const resetFilters = () => {
    if (!isFilterActive) {
      return;
    }

    write(FILTER_RESET_PATCH);
  };

  return {
    filter,
    isFilterActive,
    toggleFilter,
    resetFilterGroup,
    resetFilters,
  };
}
