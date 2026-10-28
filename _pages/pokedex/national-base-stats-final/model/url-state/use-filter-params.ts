import { useMemo } from 'react';

import {
  isPokeFilterActive,
  parsePokeFilter,
  toggleGroupValue,
  type PokeFilterGroup,
  type PokeFilterOptions,
} from '../filter';
import { useListParams } from './use-list-params';

/**
 * 필터 (?type=fire,flying&form=alola&gen=1).
 * - filter: 목록 계산·트리거가 쓰는 유효한 선택 (options에 있는 값만, 그룹 안은 고른 순서)
 * - toggleFilter·resetFilterGroup: 바꾼 그룹의 키만 쓴다
 *   (키가 제자리를 지켜 URL의 키 순서가 처음 고른 순서로 남는다)
 */
export function useFilterParams(options: PokeFilterOptions) {
  const { params, writeList } = useListParams();

  const { type, form, gen } = params;

  const filter = useMemo(
    () => parsePokeFilter({ type, form, gen }, options),
    [type, form, gen, options],
  );

  // ?type=foo 같은 잘못된 값만 있으면 목록도 전체라 켜진 필터가 없다
  const isFilterActive = isPokeFilterActive(filter);

  const toggleFilter = (group: PokeFilterGroup, value: string) =>
    writeList((prev) => ({
      [group]: toggleGroupValue(prev[group], value, group, options),
    }));

  const resetFilterGroup = (group: PokeFilterGroup) =>
    writeList({ [group]: null });

  return { filter, isFilterActive, toggleFilter, resetFilterGroup };
}
