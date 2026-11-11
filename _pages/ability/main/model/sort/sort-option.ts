import type { AbilitySort, SortKey, SortOrder } from './sort-abilities';

interface SortOption {
  key: SortKey;
  // 기준 이름
  label: string;
  // 정렬 목록의 고른 줄: 앞에 기준 이름이 있어 짧게 ('번호순', '이름 반대순')
  orderLabel: Record<SortOrder, string>;
  // 정렬 전체 이름 (결과 줄 정렬 버튼): 혼자 보여도 무엇의 순서인지 알 수 있게 ('특성번호순')
  sortLabel: Record<SortOrder, string>;
}

// 모든 기준이 순서형(번호·이름·등장)이라 기준을 새로 고르면 asc부터.
// 맞춤법: 명사 뒤 '순'은 붙여 쓴다(번호순·이름순·등장순). '반대순'은 전국도감 종족값과 같은 표현.
// 배열 순서가 정렬 시트의 기준 순서다
const SORT_OPTIONS: readonly SortOption[] = [
  {
    key: 'abilityNumber',
    label: '특성번호',
    orderLabel: { asc: '번호순', desc: '번호 반대순' },
    sortLabel: { asc: '특성번호순', desc: '특성번호 반대순' },
  },
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

// 정렬 전체 이름: '특성번호순', '이름 반대순', '등장순'
const getSortLabel = ({ sort, order }: AbilitySort): string =>
  getSortOption(sort).sortLabel[order];

// 방향 이름: 위에 기준 이름이 있는 곳(정렬 목록의 고른 줄)에서 쓴다 ('번호순', '등장 반대순')
const getOrderLabel = ({ sort, order }: AbilitySort): string =>
  getSortOption(sort).orderLabel[order];

// 표 머리글·정렬 목록: 같은 기준이면 방향 반전, 다른 기준이면 asc부터
const getToggledSort = (current: AbilitySort, key: SortKey): AbilitySort =>
  key === current.sort
    ? { sort: key, order: current.order === 'asc' ? 'desc' : 'asc' }
    : { sort: key, order: INITIAL_ORDER };

// 정렬 목록 한 줄의 접근 이름. 고른 줄은 지금 방향과 다시 누르면 바뀔 방향을, 나머지는 누르면 될 정렬을 읽는다
// ('특성번호, 번호순. 다시 누르면 번호 반대순' / '이름, 이름순'). 선택 상태는 넣지 않는다 (메뉴는 aria-checked가 읽는다)
const getSortOptionAriaLabel = (
  current: AbilitySort,
  key: SortKey,
): string => {
  const { label } = getSortOption(key);
  const next = getOrderLabel(getToggledSort(current, key));

  return current.sort === key
    ? `${label}, ${getOrderLabel(current)}. 다시 누르면 ${next}`
    : `${label}, ${next}`;
};

export type { SortOption };

export {
  SORT_OPTIONS,
  getSortLabel,
  getOrderLabel,
  getToggledSort,
  getSortOptionAriaLabel,
};
