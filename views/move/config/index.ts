const SEARCH_PARAMS = {
  SEARCH: 'search',
  TYPE: 'type',
  DAMAGE_CLASS: 'class',
  SORT: 'sort',
} as const;

const SORT_OPTIONS = [
  { value: 'default', label: '기본순' },
  { value: 'name_asc', label: '이름순' },
  { value: 'name_desc', label: '이름 반대순' },
  { value: 'power_desc', label: '위력 높은순' },
  { value: 'power_asc', label: '위력 낮은순' },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

const DEFAULT_SORT: SortValue = 'default';

const VALID_SORT_VALUES: ReadonlySet<string> = new Set(
  SORT_OPTIONS.map((option) => option.value),
);

export { SEARCH_PARAMS, SORT_OPTIONS, DEFAULT_SORT, VALID_SORT_VALUES };
export type { SortValue };
