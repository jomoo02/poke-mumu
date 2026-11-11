import {
  useCheckboxFilter,
  type CheckboxFilterState,
} from '../use-checkbox-filter';

export const TYPE_FILTER_TITLE = '타입';

// 여러 타입을 고를 수 있어(OR) 트리거엔 하나만, 나머지는 '+N'
export const useTypeFilter = (): CheckboxFilterState =>
  useCheckboxFilter({
    group: 'type',
    title: TYPE_FILTER_TITLE,
    summaryLimit: 1,
  });
