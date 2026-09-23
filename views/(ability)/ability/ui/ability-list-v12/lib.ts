import type { Ability } from '@/entities/ability/model';

export const PAGE_SIZE = 100;

export const SORT_KEYS = ['name', 'gen'] as const;
export type SortKey = (typeof SORT_KEYS)[number];

export const SORT_ORDERS = ['asc', 'desc'] as const;
export type SortOrder = (typeof SORT_ORDERS)[number];

export interface AbilitySort {
  key: SortKey;
  order: SortOrder;
}

export const DEFAULT_SORT: AbilitySort = { key: 'name', order: 'asc' };

// 좁은 화면 정렬 Sheet의 선택지(순서 그대로 노출)
export const SORT_OPTIONS: readonly AbilitySort[] = [
  { key: 'name', order: 'asc' },
  { key: 'name', order: 'desc' },
  { key: 'gen', order: 'asc' },
  { key: 'gen', order: 'desc' },
];

const SORT_LABELS: Record<SortKey, Record<SortOrder, string>> = {
  name: { asc: '가나다순', desc: '이름 역순' },
  gen: { asc: '세대 오름차순', desc: '세대 내림차순' },
};

export function getSortLabel({ key, order }: AbilitySort) {
  return SORT_LABELS[key][order];
}

export function isSameSort(a: AbilitySort, b: AbilitySort) {
  return a.key === b.key && a.order === b.order;
}

// localeCompare(b, 'ko')와 같은 순서. 300여 개를 매번 정렬하므로 Collator를 재사용한다.
const koCollator = new Intl.Collator('ko');

const compareNameKo = (a: Ability, b: Ability) =>
  koCollator.compare(a.nameKo, b.nameKo);

export function sortAbilities(
  abilities: Ability[],
  { key, order }: AbilitySort,
): Ability[] {
  const direction = order === 'asc' ? 1 : -1;

  return [...abilities].sort((a, b) => {
    if (key === 'gen') {
      // 같은 세대 안에서는 방향과 무관하게 가나다순
      return (a.gen - b.gen) * direction || compareNameKo(a, b);
    }
    return compareNameKo(a, b) * direction;
  });
}

// 이름 아래 보조 표기: 일본어 이름이 없으면 영문만
export function formatSubName({
  nameEn,
  nameJa,
}: Pick<Ability, 'nameEn' | 'nameJa'>) {
  return nameJa ? `${nameEn} · ${nameJa}` : nameEn;
}

export function getAbilityHref(identifier: string) {
  return `/ability/${identifier}`;
}
