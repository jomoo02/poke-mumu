import {
  DEFAULT_SORT,
  type AbilitySort,
  type SortKey,
  type SortOrder,
} from './sort';

const SORT_OPTIONS = [
  { id: 'name-asc', sort: 'name', order: 'asc' },
  { id: 'name-desc', sort: 'name', order: 'desc' },
  { id: 'appearance-asc', sort: 'appearance', order: 'asc' },
  { id: 'appearance-desc', sort: 'appearance', order: 'desc' },
] as const satisfies readonly (AbilitySort & { id: string })[];

// RadioGroup의 단일 문자열 value/id로 쓰는 안정적인 옵션 식별자
type SortOptionId = (typeof SORT_OPTIONS)[number]['id'];

const SORT_LABELS: Record<SortKey, Record<SortOrder, string>> = {
  name: { asc: '이름 순서', desc: '이름 반대순서' },
  appearance: { asc: '등장 순서', desc: '등장 반대순서' },
};

const getSortLabel = ({ sort, order }: AbilitySort) => {
  return SORT_LABELS[sort][order];
};

// 정렬 객체 ↔ 문자열 id 변환은 여기(model)로 모아 UI가 문자열만 다루게 한다
const getSortId = ({ sort, order }: AbilitySort): SortOptionId =>
  `${sort}-${order}`;

const getSortById = (id: string): AbilitySort => {
  const found = SORT_OPTIONS.find((option) => option.id === id);
  return found ? { sort: found.sort, order: found.order } : DEFAULT_SORT;
};

export type { SortOptionId };

export { SORT_OPTIONS, getSortLabel, getSortId, getSortById };
