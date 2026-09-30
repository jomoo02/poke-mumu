import type { MoveSort, SortKey, SortOrder } from './sort';

// 방향 라벨 어법 구분
// - sequence: 순서형(번호·이름·타입·분류) → "…순 / …역순"
// - amount:   수치형(위력·명중·PP) → "…높은 순 / …낮은 순", 처음 고르면 높은 순부터
type SortKind = 'sequence' | 'amount';

interface SortOption {
  key: SortKey;
  label: string;
  kind: SortKind;
}

const SORT_OPTIONS = [
  { key: 'moveNumber', label: '번호', kind: 'sequence' },
  { key: 'name', label: '이름', kind: 'sequence' },
  { key: 'type', label: '타입', kind: 'sequence' },
  { key: 'damageClass', label: '분류', kind: 'sequence' },
  { key: 'power', label: '위력', kind: 'amount' },
  { key: 'accuracy', label: '명중', kind: 'amount' },
  { key: 'pp', label: 'PP', kind: 'amount' },
] as const satisfies readonly SortOption[];

const getSortOption = (key: SortKey): SortOption =>
  SORT_OPTIONS.find((option) => option.key === key) ?? SORT_OPTIONS[0];

// 기준 이름을 뺀 방향 라벨 (getSortLabel이 기준 이름과 합쳐 쓴다)
const getOrderLabel = (key: SortKey, order: SortOrder): string => {
  if (getSortOption(key).kind === 'amount') {
    return order === 'desc' ? '높은 순' : '낮은 순';
  }

  return order === 'asc' ? '순' : '역순';
};

// 기준 이름만 (모바일 정렬 기준 트리거)
const getSortKeyLabel = (key: SortKey): string => getSortOption(key).label;

const getSortLabel = ({ sort, order }: MoveSort): string =>
  `${getSortKeyLabel(sort)} ${getOrderLabel(sort, order)}`;

// 기준을 새로 고를 때의 방향
const getInitialOrder = (key: SortKey): SortOrder =>
  getSortOption(key).kind === 'amount' ? 'desc' : 'asc';

export type { SortKind, SortOption };

export {
  SORT_OPTIONS,
  getOrderLabel,
  getSortKeyLabel,
  getSortLabel,
  getInitialOrder,
};
