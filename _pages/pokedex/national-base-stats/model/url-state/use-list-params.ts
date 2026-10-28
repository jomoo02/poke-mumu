import { useQueryStates, type Nullable, type Values } from 'nuqs';

import { pokeSearchParams } from './search-params';

type ListParams = Values<typeof pokeSearchParams>;

// 목록이 달라지는 쓰기 (page는 writeList가 붙인다)
type ListPatch = Partial<Nullable<Omit<ListParams, 'page'>>>;

/**
 * url-state 훅들이 함께 쓰는 읽기·쓰기. 이 페이지에서 nuqs를 쓰는 곳은 여기뿐이다.
 * - params: URL 값 그대로 (잘못된 값은 기본값. 필터처럼 선택지에 맞춰야 하는 값은 각 훅이 해석한다)
 * - writeList: 목록이 달라지는 변경. 항상 1페이지로 되돌린다 (page: null)
 *   함수를 넘기면 렌더 시점 값 대신 직전 값(prev)으로 계산한다 (연속 클릭에도 앞 변경을 덮어쓰지 않게)
 */
export function useListParams() {
  const [params, setParams] = useQueryStates(pokeSearchParams);

  const writeList = (patch: ListPatch | ((prev: ListParams) => ListPatch)) =>
    setParams((prev) => ({
      ...(typeof patch === 'function' ? patch(prev) : patch),
      page: null,
    }));

  return { params, writeList };
}

// 현재 페이지 (?page=). 페이지 이동은 링크(PaginationNav)가 URL을 바꾼다
export function usePageParam() {
  const { params } = useListParams();

  return { page: params.page };
}
