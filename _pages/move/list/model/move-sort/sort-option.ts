import type { MoveSort, SortKey, SortOrder } from './sort';

// 기준 종류: 처음 고를 때의 방향
// - sequence: 순서형(번호·이름) → asc부터
// - amount:   수치형(위력·명중·PP) → desc(높은 순)부터
type SortKind = 'sequence' | 'amount';

interface SortOption {
  key: SortKey;
  label: string;
  kind: SortKind;
  // 정렬 전체 이름 (정렬 방향 버튼의 스크린리더 안내용)
  sortLabel: Record<SortOrder, string>;
}

// 수치형은 '{기준} 높은 순 / {기준} 낮은 순'
const amountOption = (key: SortKey, label: string): SortOption => ({
  key,
  label,
  kind: 'amount',
  sortLabel: { desc: `${label} 높은 순`, asc: `${label} 낮은 순` },
});

// 순서형은 무엇 순인지가 기준마다 달라 이름을 직접 정한다.
// 맞춤법: 명사 뒤 '순'은 붙여 쓰고(번호순·이름순), 꾸미는 말 뒤 '순'은 띄어 쓴다(높은 순)
const SORT_OPTIONS: readonly SortOption[] = [
  {
    key: 'moveNumber',
    label: '기술번호',
    kind: 'sequence',
    sortLabel: { asc: '번호순', desc: '번호 역순' },
  },
  {
    key: 'name',
    label: '이름',
    kind: 'sequence',
    sortLabel: { asc: '이름순', desc: '이름 역순' },
  },
  amountOption('power', '위력'),
  amountOption('accuracy', '명중'),
  amountOption('pp', 'PP'),
];

const getSortOption = (key: SortKey): SortOption =>
  SORT_OPTIONS.find((option) => option.key === key) ?? SORT_OPTIONS[0];

// 정렬 전체 이름: '번호순', '이름 역순', '위력 높은 순'
const getSortLabel = ({ sort, order }: MoveSort): string =>
  getSortOption(sort).sortLabel[order];

// 기준을 새로 고를 때의 방향
const getInitialOrder = (key: SortKey): SortOrder =>
  getSortOption(key).kind === 'amount' ? 'desc' : 'asc';

export type { SortKind, SortOption };

export { SORT_OPTIONS, getSortLabel, getInitialOrder };
