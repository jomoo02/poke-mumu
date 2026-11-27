import type { MoveSort, SortKey, SortOrder } from './sort-moves';

// 기준 종류: 방향을 고르는 순서를 정한다
// - sequence: 순서형(이름) → asc부터
// - amount:   수치형(위력·명중·PP) → desc(높은 순)부터
type SortKind = 'sequence' | 'amount';

interface SortOption {
  key: SortKey;
  label: string;
  kind: SortKind;
  orderLabel: Record<SortOrder, string>;
  sortLabel: Record<SortOrder, string>;
}

const ORDERS_BY_KIND: Record<SortKind, readonly [SortOrder, SortOrder]> = {
  sequence: ['asc', 'desc'],
  amount: ['desc', 'asc'],
};

const AMOUNT_ORDER_LABEL: Record<SortOrder, string> = {
  desc: '높은 순',
  asc: '낮은 순',
};

const amountOption = (key: SortKey, label: string): SortOption => ({
  key,
  label,
  kind: 'amount',
  orderLabel: AMOUNT_ORDER_LABEL,
  sortLabel: {
    desc: `${label} ${AMOUNT_ORDER_LABEL.desc}`,
    asc: `${label} ${AMOUNT_ORDER_LABEL.asc}`,
  },
});

const SORT_OPTIONS: readonly SortOption[] = [
  {
    key: 'name',
    label: '이름',
    kind: 'sequence',
    orderLabel: { asc: '이름순', desc: '이름 반대순' },
    sortLabel: { asc: '이름순', desc: '이름 반대순' },
  },
  amountOption('power', '위력'),
  amountOption('accuracy', '명중'),
  amountOption('pp', 'PP'),
];

const getSortOption = (key: SortKey): SortOption =>
  SORT_OPTIONS.find((option) => option.key === key) ?? SORT_OPTIONS[0];

// 정렬 전체 이름: '이름순', '이름 반대순', '위력 높은 순'
const getSortLabel = ({ sort, order }: MoveSort): string =>
  getSortOption(sort).sortLabel[order];

// 기준을 새로 고를 때의 방향
const getInitialOrder = (key: SortKey): SortOrder =>
  ORDERS_BY_KIND[getSortOption(key).kind][0];

// 표 머리글: 같은 기준이면 방향 반전, 다른 기준이면 그 기준의 첫 방향부터
const getToggledSort = (current: MoveSort, key: SortKey): MoveSort =>
  key === current.sort
    ? { sort: key, order: current.order === 'asc' ? 'desc' : 'asc' }
    : { sort: key, order: getInitialOrder(key) };

// 정렬 시트·메뉴의 기준 섹션: 같은 기준이면 그대로, 다른 기준이면 그 기준의 첫 방향부터.
// 방향은 아래 방향 섹션에서 따로 고른다 (기준 → 방향 순서라, 고른 방향을 기준이 덮어쓰지 않는다)
const getKeySelectedSort = (current: MoveSort, key: SortKey): MoveSort =>
  key === current.sort ? current : { sort: key, order: getInitialOrder(key) };

interface OrderOption {
  order: SortOrder;
  label: string;
}

const getOrderOptions = (sort: SortKey): OrderOption[] => {
  const { kind, orderLabel } = getSortOption(sort);

  return ORDERS_BY_KIND[kind].map((order) => ({
    order,
    label: orderLabel[order],
  }));
};

export type { SortOption, OrderOption };

export {
  SORT_OPTIONS,
  getSortLabel,
  getInitialOrder,
  getToggledSort,
  getKeySelectedSort,
  getOrderOptions,
};
