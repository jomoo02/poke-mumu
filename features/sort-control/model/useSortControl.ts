'use client';

import {
  useSearchParamsState,
  type SearchParamsStateOptions,
} from '@/shared/lib/search-params';

import type { SortConfig, SortDir } from './sort-option';
import { resolveSortState } from './sort-state';

const SORT_KEY = 'sort';
const DIR_KEY = 'dir';

/**
 * 정렬 컨트롤 상태(key + dir). URL은 shared 플러밍으로 읽고 쓴다.
 * 기본값은 URL에 쓰지 않는다(sort=기본키/ dir=기본방향이면 파라미터 제거).
 *
 * @param config   뷰가 주입하는 정렬 설정
 * @param options  startTransition/resetKeys 등 (예: pokedex/all은 resetKeys:['page'])
 */
export function useSortControl<T>(
  config: SortConfig<T>,
  options?: SearchParamsStateOptions,
) {
  const { searchParams, setParams } = useSearchParamsState(options);

  const defaultDir: SortDir = config.defaultDir ?? 'asc';

  const { sortKey, sortDir } = resolveSortState(
    config,
    searchParams.get(SORT_KEY),
    searchParams.get(DIR_KEY),
  );

  const isActive = sortKey !== config.defaultKey || sortDir !== defaultDir;

  const changeSortKey = (nextKey: string) => {
    if (!config.options.some((option) => option.key === nextKey)) return;
    setParams({ [SORT_KEY]: nextKey === config.defaultKey ? null : nextKey });
  };

  const changeSortDir = (nextDir: SortDir) => {
    setParams({ [DIR_KEY]: nextDir === defaultDir ? null : nextDir });
  };

  // key·dir을 한 번의 네비게이션으로 함께 초기화한다.
  const resetSort = () => setParams({ [SORT_KEY]: null, [DIR_KEY]: null });

  return { sortKey, sortDir, isActive, changeSortKey, changeSortDir, resetSort };
}
