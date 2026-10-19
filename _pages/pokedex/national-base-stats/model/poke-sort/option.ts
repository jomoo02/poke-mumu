import { STAT_KEYS, STAT_LABEL } from '../base-stats-poke';
import type { PokeSort, SortKey, SortOrder } from './poke-sort';

// 기준 종류: 처음 고를 때의 방향
// - sequence: 순서형(번호·이름) → asc부터
// - amount:   수치형(종족값·능력치) → desc(높은 순)부터
type SortKind = 'sequence' | 'amount';

interface SortOption {
  key: SortKey;
  label: string;
  kind: SortKind;
  // 정렬 전체 이름 (정렬 방향 버튼의 스크린리더 안내용)
  sortLabel: Record<SortOrder, string>;
}

// 맞춤법: 명사 뒤 '순'은 붙여 쓰고(번호순·이름순), 꾸미는 말 뒤 '순'은 띄어 쓴다(높은 순)
const SORT_OPTIONS: readonly SortOption[] = [
  {
    key: 'dexNumber',
    label: '도감번호',
    kind: 'sequence',
    sortLabel: { asc: '번호순', desc: '번호 역순' },
  },
  {
    key: 'name',
    label: '이름',
    kind: 'sequence',
    sortLabel: { asc: '이름순', desc: '이름 역순' },
  },
  ...STAT_KEYS.map((key): SortOption => ({
    key,
    label: STAT_LABEL[key],
    kind: 'amount',
    sortLabel: {
      desc: `${STAT_LABEL[key]} 높은 순`,
      asc: `${STAT_LABEL[key]} 낮은 순`,
    },
  })),
];

const getSortOption = (key: SortKey): SortOption =>
  SORT_OPTIONS.find((option) => option.key === key) ?? SORT_OPTIONS[0];

// 정렬 전체 이름: '번호순', '이름 역순', '스피드 높은 순'
const getSortLabel = ({ sort, order }: PokeSort): string =>
  getSortOption(sort).sortLabel[order];

// 기준을 새로 고를 때의 방향
const getInitialOrder = (key: SortKey): SortOrder =>
  getSortOption(key).kind === 'amount' ? 'desc' : 'asc';

export type { SortOption };

export { SORT_OPTIONS, getSortLabel, getInitialOrder };
