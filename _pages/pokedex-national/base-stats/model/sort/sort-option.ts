import { STAT_KEYS, STAT_LABEL } from '../poke';
import type { PokeSort, SortKey, SortOrder } from './sort-pokes';

// 기준 종류: 방향을 고르는 순서를 정한다
// - sequence: 순서형(번호·이름) → asc부터
// - amount:   수치형(종족값·능력치) → desc(높은 순)부터
type SortKind = 'sequence' | 'amount';

interface SortOption {
  key: SortKey;
  // 기준 이름. 줄이지 않는다 (특수공격·특수방어)
  label: string;
  kind: SortKind;
  // 정렬 목록의 고른 줄: 앞에 기준 이름이 있어 짧게 ('번호순', '높은 순')
  orderLabel: Record<SortOrder, string>;
  // 정렬 전체 이름 (결과 줄 정렬 버튼): 혼자 보여도 무엇의 순서인지 알 수 있게 ('도감번호순', '특수공격 높은 순')
  sortLabel: Record<SortOrder, string>;
}

// 종류별 방향 순서. 첫 방향이 기준을 새로 고를 때의 방향이다
const ORDERS_BY_KIND: Record<SortKind, readonly [SortOrder, SortOrder]> = {
  sequence: ['asc', 'desc'],
  amount: ['desc', 'asc'],
};

const AMOUNT_ORDER_LABEL: Record<SortOrder, string> = {
  desc: '높은 순',
  asc: '낮은 순',
};

// 맞춤법: 명사 뒤 '순'은 붙여 쓰고(번호순·이름순), 꾸미는 말 뒤 '순'은 띄어 쓴다(높은 순).
// '반대순'은 포켓몬 공식 도감의 표현. 순서형은 기준 이름을 붙인다 ('반대순'만으로는 무엇의 반대인지 애매하다)
// 배열 순서가 정렬 시트의 기준 순서다: 도감번호 · 이름 · 능력치(게임 표시 순서) · 총합
const SORT_OPTIONS: readonly SortOption[] = [
  {
    key: 'dexNumber',
    label: '도감번호',
    kind: 'sequence',
    orderLabel: { asc: '번호순', desc: '번호 반대순' },
    sortLabel: { asc: '도감번호순', desc: '도감번호 반대순' },
  },
  {
    key: 'name',
    label: '이름',
    kind: 'sequence',
    orderLabel: { asc: '이름순', desc: '이름 반대순' },
    sortLabel: { asc: '이름순', desc: '이름 반대순' },
  },
  ...STAT_KEYS.map((key): SortOption => ({
    key,
    label: STAT_LABEL[key],
    kind: 'amount',
    orderLabel: AMOUNT_ORDER_LABEL,
    sortLabel: {
      desc: `${STAT_LABEL[key]} ${AMOUNT_ORDER_LABEL.desc}`,
      asc: `${STAT_LABEL[key]} ${AMOUNT_ORDER_LABEL.asc}`,
    },
  })),
];

const getSortOption = (key: SortKey): SortOption =>
  SORT_OPTIONS.find((option) => option.key === key) ?? SORT_OPTIONS[0];

// 정렬 전체 이름: '도감번호순', '이름 반대순', '스피드 높은 순'
const getSortLabel = ({ sort, order }: PokeSort): string =>
  getSortOption(sort).sortLabel[order];

// 기준을 새로 고를 때의 방향
const getInitialOrder = (key: SortKey): SortOrder =>
  ORDERS_BY_KIND[getSortOption(key).kind][0];

// 방향 이름: 위에 기준 이름이 있는 곳(정렬 목록의 고른 줄)에서 쓴다 ('번호순', '높은 순')
const getOrderLabel = ({ sort, order }: PokeSort): string =>
  getSortOption(sort).orderLabel[order];

// 표 머리글·정렬 목록: 같은 기준이면 방향 반전, 다른 기준이면 그 기준의 첫 방향부터
const getToggledSort = (current: PokeSort, key: SortKey): PokeSort =>
  key === current.sort
    ? { sort: key, order: current.order === 'asc' ? 'desc' : 'asc' }
    : { sort: key, order: getInitialOrder(key) };

// 정렬 목록 한 줄의 접근 이름. 고른 줄은 지금 방향과 다시 누르면 바뀔 방향을, 나머지는 누르면 될 정렬을 읽는다
// ('총합, 높은 순. 다시 누르면 낮은 순' / 'HP, 높은 순'). 선택 상태는 넣지 않는다 (메뉴는 aria-checked가 읽는다)
const getSortOptionAriaLabel = (current: PokeSort, key: SortKey): string => {
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
  getInitialOrder,
  getOrderLabel,
  getToggledSort,
  getSortOptionAriaLabel,
};
