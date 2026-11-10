import {
  useCheckboxFilter,
  type CheckboxFilterState,
} from '../use-checkbox-filter';

export const GEN_FILTER_TITLE = '세대';

// 트리거엔 하나만, 나머지는 '+N' (여러 세대를 고를 수 있어 이름을 다 보이면 길어진다)
export const useGenFilter = (): CheckboxFilterState =>
  useCheckboxFilter({
    group: 'gen',
    title: GEN_FILTER_TITLE,
    summaryLimit: 1,
  });
