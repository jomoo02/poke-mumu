import type { SortConfig, SortDir } from './sort-option';

export interface SortState {
  sortKey: string;
  sortDir: SortDir;
}

/**
 * URL 원시값(sort, dir)을 config 기준으로 정규화한다. 컨트롤과 리스트가 공유.
 * - 잘못된/없는 값은 기본값으로 폴백.
 */
export function resolveSortState<T>(
  config: SortConfig<T>,
  sortRaw: string | null,
  dirRaw: string | null,
): SortState {
  const defaultDir: SortDir = config.defaultDir ?? 'asc';

  const sortKey = config.options.some((option) => option.key === sortRaw)
    ? (sortRaw as string)
    : config.defaultKey;

  const sortDir: SortDir =
    dirRaw === 'asc' || dirRaw === 'desc' ? dirRaw : defaultDir;

  return { sortKey, sortDir };
}
