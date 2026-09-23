import type { SortConfig } from './sort-option';
import type { SortState } from './sort-state';

// 호출마다 재생성하지 않도록 모듈 스코프로 고정.
const collator = new Intl.Collator('ko');

/**
 * config.accessor 기반 제네릭 정렬. 도메인 무지식(순수 함수).
 * - 문자열: ko 로케일 비교 / 숫자: 차이
 * - 동점: config.tieBreak (없으면 원본 순서 유지)
 */
export function applySort<T>(
  items: T[],
  { sortKey, sortDir }: SortState,
  config: SortConfig<T>,
): T[] {
  const option =
    config.options.find((candidate) => candidate.key === sortKey) ??
    config.options[0];

  if (!option) return [...items];

  const sign = sortDir === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    const aValue = option.accessor(a);
    const bValue = option.accessor(b);

    const comparison =
      typeof aValue === 'string'
        ? collator.compare(aValue, bValue as string)
        : (aValue as number) - (bValue as number);

    if (comparison !== 0) return comparison * sign;

    return config.tieBreak ? config.tieBreak(a, b) : 0;
  });
}
