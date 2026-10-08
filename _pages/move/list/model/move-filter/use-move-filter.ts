'use client';

import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import {
  removeFacetGroup,
  toggleFacet,
  type Facet,
} from '@/_shared/lib/facet-param';

import { parseMoveFilter } from './move-filter';
import { moveSearchParams } from '../search-params';
import type { FilterGroupName } from '../../config/move-list';

const PARSERS = {
  filter: moveSearchParams.filter,
  page: moveSearchParams.page,
};

/**
 * 타입·분류 필터 상태 (URL ?filter=type.fire_damageClass.physical).
 * - filter: 목록 계산·트리거·배지가 쓰는 유효한 선택 (고른 순서는 selections)
 * - toggle·resetGroup: 고른 순서를 지키며 page를 함께 지운다
 * - reset: 필터(타입·분류)만 기본값으로. 정렬은 조작하는 곳(테이블 헤더, 정렬 메뉴)에서 되돌리고,
 *   검색어는 사용자가 직접 입력한 값이라 건드리지 않는다
 */
export function useMoveFilter() {
  const [{ filter: facets }, setParams] = useQueryStates(PARSERS);

  const filter = useMemo(() => parseMoveFilter(facets), [facets]);

  // ?filter=type.foo 같은 잘못된 값만 있으면 목록도 전체라 켜진 필터가 없다
  const isActive = filter.selections.length > 0;

  // 쓰기 전에 유효한 선택만 남겨, 잘못된 값·중복이 URL에 이어지지 않고 첫 조작에 정리되게 한다.
  // 연속 클릭에도 앞 변경을 덮어쓰지 않게 렌더 시점 값 대신 prev를 쓴다
  const updateSelections = (next: (selections: Facet[]) => Facet[]) =>
    setParams((prev) => ({
      filter: next(parseMoveFilter(prev.filter).selections),
      page: null,
    }));

  const toggle = (group: FilterGroupName, value: string) =>
    updateSelections((selections) => toggleFacet(selections, { group, value }));

  const resetGroup = (group: FilterGroupName) =>
    updateSelections((selections) => removeFacetGroup(selections, group));

  const reset = () => {
    // 이미 기본 상태면 URL을 건드리지 않는다 (page 리셋 방지)
    if (!isActive) {
      return;
    }

    setParams({ filter: null, page: null });
  };

  return { filter, isActive, toggle, resetGroup, reset };
}
