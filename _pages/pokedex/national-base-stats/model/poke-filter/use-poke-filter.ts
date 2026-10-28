import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { pokeSearchParams } from '../search-params';
import type { PokeFilterGroup, PokeFilterOptions } from './filter-option';
import { isPokeFilterActive, parseGroup, parsePokeFilter } from './poke-filter';

const PARSERS = {
  type: pokeSearchParams.type,
  form: pokeSearchParams.form,
  gen: pokeSearchParams.gen,
  page: pokeSearchParams.page,
};

// 있으면 빼고, 없으면 맨 뒤에 붙인다 (그룹 안 고른 순서 유지)
const toggleValue = (values: readonly string[], value: string): string[] =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];

/**
 * 필터 상태 (URL ?type=fire,flying&form=alola&gen=1).
 * - filter: 목록 계산·트리거가 쓰는 유효한 선택 (options에 있는 값만, 그룹 안은 고른 순서)
 * - toggle·resetGroup: 그 그룹의 키만 바꾸고 page를 함께 지운다
 * 검색어·이름 언어까지 한 번에 지우는 초기화는 useResetConditions
 */
export function usePokeFilter(options: PokeFilterOptions) {
  const [raw, setParams] = useQueryStates(PARSERS);

  const filter = useMemo(() => parsePokeFilter(raw, options), [raw, options]);

  // ?type=foo 같은 잘못된 값만 있으면 목록도 전체라 켜진 필터가 없다
  const isActive = isPokeFilterActive(filter);

  // 쓰기 전에 유효한 값만 남겨, 잘못된 값·중복이 URL에 이어지지 않고 첫 조작에 정리되게 한다.
  // 바꾼 그룹의 키만 쓴다 (키가 제자리를 지켜 URL의 키 순서가 처음 고른 순서로 남는다).
  // 연속 클릭에도 앞 변경을 덮어쓰지 않게 렌더 시점 값 대신 prev를 쓴다
  const toggle = (group: PokeFilterGroup, value: string) =>
    setParams((prev) => ({
      [group]: parseGroup(
        toggleValue(parseGroup(prev[group], group, options), value),
        group,
        options,
      ),
      page: null,
    }));

  const resetGroup = (group: PokeFilterGroup) => setParams({ [group]: null, page: null });

  return { filter, isActive, toggle, resetGroup };
}
