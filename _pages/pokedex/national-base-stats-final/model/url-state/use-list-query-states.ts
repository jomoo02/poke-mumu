import {
  useQueryStates,
  type Nullable,
  type UseQueryStatesKeysMap,
  type Values,
} from 'nuqs';

import { pageSearchParams } from './use-page-param';

// 목록이 달라지는 쓰기 (page는 write가 붙인다)
type ListPatch<P extends UseQueryStatesKeysMap> = Partial<Nullable<Values<P>>>;

/**
 * 기능 하나의 URL 상태 읽기·쓰기. 이 페이지에서 nuqs 훅을 쓰는 곳은 여기뿐이다.
 * 기능마다 자기 키(parsers)만 넘겨, 다른 기능의 키가 바뀌어도 다시 그리지 않는다.
 * - values: URL 값 그대로 (잘못된 값은 기본값. 필터처럼 선택지에 맞춰야 하는 값은 기능 훅이 해석한다)
 * - write: 목록이 달라지는 변경. 항상 1페이지로 되돌린다 (page: null)
 *   함수를 넘기면 렌더 시점 값 대신 직전 값(prev)으로 계산한다 (연속 클릭에도 앞 변경을 덮어쓰지 않게)
 */
export function useListQueryStates<P extends UseQueryStatesKeysMap>(parsers: P) {
  const [values, setValues] = useQueryStates(parsers);
  const [, setPage] = useQueryStates(pageSearchParams);

  const write = (patch: ListPatch<P> | ((prev: Values<P>) => ListPatch<P>)) => {
    // 같은 틱의 두 쓰기는 nuqs가 URL 갱신 한 번으로 합친다
    setValues(patch);
    setPage({ page: null });
  };

  return [values, write] as const;
}
