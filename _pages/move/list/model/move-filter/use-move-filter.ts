'use client';

import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { parseMoveFilter } from './move-filter';
import { moveSearchParams } from '../search-params';
import type { FilterGroupName } from '../../config/move-list';

const PARSERS = {
  type: moveSearchParams.type,
  damageClass: moveSearchParams.damageClass,
  page: moveSearchParams.page,
};

// 있으면 빼고, 없으면 맨 뒤에 붙인다 (그룹 안 고른 순서 유지)
const toggleValue = (values: readonly string[], value: string): string[] =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];

/**
 * 타입·분류 필터 상태 (URL ?type=fire,grass&damageClass=physical).
 * - filter: 목록 계산·트리거·배지가 쓰는 유효한 선택 (그룹 안은 고른 순서)
 * - toggle·resetGroup: 그 그룹의 키만 바꾸고 page를 함께 지운다
 * - reset: 필터(타입·분류)만 기본값으로. 정렬은 조작하는 곳(테이블 헤더, 정렬 메뉴)에서 되돌리고,
 *   검색어는 사용자가 직접 입력한 값이라 건드리지 않는다
 */
export function useMoveFilter() {
  const [{ type, damageClass }, setParams] = useQueryStates(PARSERS);

  const filter = useMemo(
    () => parseMoveFilter({ type, damageClass }),
    [type, damageClass],
  );

  // ?type=foo 같은 잘못된 값만 있으면 목록도 전체라 켜진 필터가 없다
  const isActive = filter.types.length > 0 || filter.damageClasses.length > 0;

  // 쓰기 전에 유효한 선택만 남겨, 잘못된 값·중복이 URL에 이어지지 않고 첫 조작에 정리되게 한다.
  // 연속 클릭에도 앞 변경을 덮어쓰지 않게 렌더 시점 값 대신 prev를 쓴다
  // 바꾼 그룹의 키만 쓴다 (키가 제자리를 지켜 URL의 키 순서가 처음 고른 순서로 남는다)
  const toggle = (group: FilterGroupName, value: string) =>
    setParams((prev) => {
      const { types, damageClasses } = parseMoveFilter(prev);
      const current = group === 'type' ? types : damageClasses;

      return { [group]: toggleValue(current, value), page: null };
    });

  const resetGroup = (group: FilterGroupName) =>
    setParams({ [group]: null, page: null });

  const reset = () => {
    // 이미 기본 상태면 URL을 건드리지 않는다 (page 리셋 방지)
    if (!isActive) {
      return;
    }

    setParams({ type: null, damageClass: null, page: null });
  };

  return { filter, isActive, toggle, resetGroup, reset };
}
