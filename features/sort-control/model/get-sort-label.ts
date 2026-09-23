import type { SortConfig, SortDir } from './sort-option';

/**
 * 트리거 버튼에 쓸 사람이 읽는 정렬 문구. 훅/URL에 의존하지 않는 순수 함수.
 * - amount(스탯류): "…낮은 순" / "…높은 순"
 * - sequence(도감번호·이름): "…순" / "…역순"
 */
export function getSortLabel<T>(
  config: SortConfig<T>,
  sortKey: string,
  sortDir: SortDir,
): string {
  const option =
    config.options.find((candidate) => candidate.key === sortKey) ??
    config.options[0];

  if (!option) return '정렬';

  if (option.kind === 'amount') {
    return sortDir === 'desc'
      ? `정렬: ${option.label} 높은 순`
      : `정렬: ${option.label} 낮은 순`;
  }

  return sortDir === 'asc'
    ? `정렬: ${option.label} 순`
    : `정렬: ${option.label} 역순`;
}
