import { useMemo } from 'react';
import { useQueryStates } from 'nuqs';

import { DEFAULT_NAME_LANGUAGE, type NameLanguage } from '../name-language';
import {
  isPokeFilterActive,
  parsePokeFilter,
  toggleGroupValue,
  type PokeFilterGroup,
  type PokeFilterOptions,
} from '../filter';
import {
  getKeySelectedSort,
  getToggledSort,
  isSameSort,
  type PokeSort,
  type SortKey,
  type SortOrder,
} from '../sort';
import { pokeSearchParams } from './search-params';

/**
 * 목록 조건(검색어·필터·정렬·이름 언어·페이지)의 URL 상태. 이 페이지에서 URL을 읽고 쓰는 곳은 여기뿐이다.
 * - 읽기: 유효한 값으로 (필터는 options에 있는 값만, 그룹 안은 고른 순서)
 * - 쓰기: 목록이 달라지는 변경은 모두 1페이지로 (page: null). 같은 값을 다시 고르면 URL을 쓰지 않는다
 */
export function useConditions(options: PokeFilterOptions) {
  const [params, setParams] = useQueryStates(pokeSearchParams);

  const { search: keyword, lang: language, page, sort, order } = params;

  const filter = useMemo(
    () =>
      parsePokeFilter(
        { type: params.type, form: params.form, gen: params.gen },
        options,
      ),
    [params.type, params.form, params.gen, options],
  );

  const sortState = useMemo<PokeSort>(() => ({ sort, order }), [sort, order]);

  // ?type=foo 같은 잘못된 값만 있으면 목록도 전체라 켜진 필터가 없다
  const isFilterActive = isPokeFilterActive(filter);

  // 초기화할 게 있는가 (정렬은 결과 줄의 보기 설정이라 세지 않는다. 결정 문서 2026-10-23)
  const isActive =
    keyword !== '' || language !== DEFAULT_NAME_LANGUAGE || isFilterActive;

  // 한글 조합 끝처럼 같은 검색어를 다시 반영할 때는 쓰지 않는다
  const setKeyword = (next: string) => {
    if (next === keyword) {
      return;
    }

    setParams({ search: next, page: null });
  };

  // 바꾼 그룹의 키만 쓴다 (키가 제자리를 지켜 URL의 키 순서가 처음 고른 순서로 남는다).
  // 연속 클릭에도 앞 변경을 덮어쓰지 않게 렌더 시점 값 대신 prev를 쓴다
  const toggleFilter = (group: PokeFilterGroup, value: string) =>
    setParams((prev) => ({
      [group]: toggleGroupValue(prev[group], value, group, options),
      page: null,
    }));

  const resetFilterGroup = (group: PokeFilterGroup) =>
    setParams({ [group]: null, page: null });

  const setSort = (next: PokeSort) => {
    if (isSameSort(next, sortState)) {
      return;
    }

    setParams({ sort: next.sort, order: next.order, page: null });
  };

  // 표 머리글
  const toggleSort = (key: SortKey) => setSort(getToggledSort(sortState, key));

  // 정렬 시트: 기준 칸 / 방향 칸
  const selectSortKey = (key: SortKey) =>
    setSort(getKeySelectedSort(sortState, key));

  const selectSortOrder = (nextOrder: SortOrder) =>
    setSort({ sort, order: nextOrder });

  // 이름순 정렬·검색 결과가 언어마다 달라 1페이지로
  const setLanguage = (next: NameLanguage) => {
    if (next === language) {
      return;
    }

    setParams({ lang: next, page: null });
  };

  // 검색어·이름 언어·필터를 한 번에 처음으로 (정렬은 둔다).
  // 언어만 되돌리면 그 언어로 친 검색어가 남아 0건이 되므로 검색어도 함께 지운다
  const reset = () => {
    if (!isActive) {
      return;
    }

    setParams({
      search: null,
      lang: null,
      type: null,
      form: null,
      gen: null,
      page: null,
    });
  };

  return {
    keyword,
    filter,
    sortState,
    language,
    page,
    isFilterActive,
    isActive,
    setKeyword,
    toggleFilter,
    resetFilterGroup,
    toggleSort,
    selectSortKey,
    selectSortOrder,
    setLanguage,
    reset,
  };
}

export type Conditions = ReturnType<typeof useConditions>;
