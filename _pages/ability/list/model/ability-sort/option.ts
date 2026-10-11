import type { AbilitySort, SortKey, SortOrder } from './ability-sort';

interface SortOption {
  key: SortKey;
  label: string;
  // 정렬 전체 이름 (정렬 방향 버튼의 스크린리더 안내용)
  sortLabel: Record<SortOrder, string>;
}

// 모든 기준이 순서형(번호·이름·등장)이라 처음 고를 때는 asc부터.
// 맞춤법: 명사 뒤 '순'은 붙여 쓴다(번호순·이름순·등장순)
const SORT_OPTIONS: readonly SortOption[] = [
  {
    key: 'abilityNumber',
    label: '특성번호',
    sortLabel: { asc: '번호순', desc: '번호 역순' },
  },
  {
    key: 'name',
    label: '이름',
    sortLabel: { asc: '이름순', desc: '이름 역순' },
  },
  {
    key: 'appearance',
    label: '등장',
    sortLabel: { asc: '등장순', desc: '등장 역순' },
  },
];

const getSortOption = (key: SortKey): SortOption =>
  SORT_OPTIONS.find((option) => option.key === key) ?? SORT_OPTIONS[0];

// 정렬 전체 이름: '번호순', '이름 역순', '등장순'
const getSortLabel = ({ sort, order }: AbilitySort): string =>
  getSortOption(sort).sortLabel[order];

export type { SortOption };

export { SORT_OPTIONS, getSortLabel };
