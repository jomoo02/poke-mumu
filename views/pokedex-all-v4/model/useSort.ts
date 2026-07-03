'use client';

import useSearchParamsState from './useSearchParamsState';
import {
  DEFAULT_SORT_DIR,
  DEFAULT_SORT_KEY,
  getSortLabel,
  parseSort,
  SORT_OPTIONS,
  type SortDir,
} from './sort';

// 정렬 로직 전부(상태·핸들러·라벨)를 한곳에. desktop/mobile UI가 공유한다.
export default function useSort() {
  const { searchParams, update } = useSearchParamsState();
  const { key, dir } = parseSort(searchParams);

  // 키만 변경(방향 유지). 기본값이면 파라미터 제거로 정규화.
  const changeKey = (nextKey: string) => {
    const opt = SORT_OPTIONS.find((o) => o.key === nextKey);
    if (!opt) return;
    update({ sort: nextKey === DEFAULT_SORT_KEY ? null : nextKey });
  };

  // 방향만 변경(키와 독립). 기본값이면 파라미터 제거.
  const changeDir = (nextDir: SortDir) =>
    update({ dir: nextDir === DEFAULT_SORT_DIR ? null : nextDir });

  const reset = () => update({ sort: null, dir: null });

  return {
    key,
    dir,
    options: SORT_OPTIONS,
    currentLabel: getSortLabel(key, dir),
    ascLabel: getSortLabel(key, 'asc'),
    descLabel: getSortLabel(key, 'desc'),
    changeKey,
    changeDir,
    reset,
  };
}
