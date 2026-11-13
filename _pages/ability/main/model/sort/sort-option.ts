import {
  SORT_ORDERS,
  type AbilitySort,
  type SortKey,
  type SortOrder,
} from './sort-abilities';

interface SortOption {
  key: SortKey;
  // 기준 이름
  label: string;
  // 정렬 시트·메뉴의 방향 섹션 칸 이름 ('이름순', '등장 반대순')
  orderLabel: Record<SortOrder, string>;
  // 정렬 전체 이름 (결과 줄 정렬 버튼): 혼자 보여도 무엇의 순서인지 알 수 있게 ('이름순')
  sortLabel: Record<SortOrder, string>;
}

// 모든 기준이 순서형(이름·등장)이라 기준을 새로 고르면 asc부터.
// 맞춤법: 명사 뒤 '순'은 붙여 쓴다(이름순·등장순). '반대순'은 전국도감 종족값과 같은 표현.
// 배열 순서가 정렬 시트의 기준 순서다. 특성 번호는 화면에 없어 기준으로 두지 않는다
const SORT_OPTIONS: readonly SortOption[] = [
  {
    key: 'name',
    label: '이름',
    orderLabel: { asc: '이름순', desc: '이름 반대순' },
    sortLabel: { asc: '이름순', desc: '이름 반대순' },
  },
  {
    key: 'appearance',
    label: '등장',
    orderLabel: { asc: '등장순', desc: '등장 반대순' },
    sortLabel: { asc: '등장순', desc: '등장 반대순' },
  },
];

const INITIAL_ORDER: SortOrder = 'asc';

const getSortOption = (key: SortKey): SortOption =>
  SORT_OPTIONS.find((option) => option.key === key) ?? SORT_OPTIONS[0];

// 정렬 전체 이름: '이름순', '이름 반대순', '등장순'
const getSortLabel = ({ sort, order }: AbilitySort): string =>
  getSortOption(sort).sortLabel[order];

// 표 머리글: 같은 기준이면 방향 반전, 다른 기준이면 asc부터
const getToggledSort = (current: AbilitySort, key: SortKey): AbilitySort =>
  key === current.sort
    ? { sort: key, order: current.order === 'asc' ? 'desc' : 'asc' }
    : { sort: key, order: INITIAL_ORDER };

// 정렬 시트의 기준 섹션: 같은 기준이면 그대로, 다른 기준이면 그 기준의 첫 방향(asc)부터.
// 방향은 아래 방향 섹션에서 따로 고른다 (기준 → 방향 순서라, 고른 방향을 기준이 덮어쓰지 않는다)
const getKeySelectedSort = (current: AbilitySort, key: SortKey): AbilitySort =>
  key === current.sort ? current : { sort: key, order: INITIAL_ORDER };

interface OrderOption {
  order: SortOrder;
  // 방향 섹션의 칸 이름 ('이름순', '이름 반대순')
  label: string;
}

// 정렬 시트의 방향 섹션: 지금 기준의 두 방향 (asc → desc)
const getOrderOptions = (sort: SortKey): OrderOption[] => {
  const { orderLabel } = getSortOption(sort);

  return SORT_ORDERS.map((order) => ({ order, label: orderLabel[order] }));
};

export type { SortOption, OrderOption };

export {
  SORT_OPTIONS,
  getSortLabel,
  getToggledSort,
  getKeySelectedSort,
  getOrderOptions,
};
