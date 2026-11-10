import {
  useCheckboxFilter,
  type CheckboxFilterState,
} from '../use-checkbox-filter';

export const FORM_FILTER_TITLE = '모습';

// 이름이 길어('팔데아의 모습') 트리거엔 하나만, 나머지는 '+N'
export const useFormFilter = (): CheckboxFilterState =>
  useCheckboxFilter({
    group: 'form',
    title: FORM_FILTER_TITLE,
    summaryLimit: 1,
  });
