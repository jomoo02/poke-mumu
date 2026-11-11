import {
  useCheckboxFilter,
  type CheckboxFilterState,
} from '../use-checkbox-filter';

export const DAMAGE_CLASS_FILTER_TITLE = '분류';

// 선택지가 셋뿐이라 둘까지 이름을 보인다 ('분류: 물리 / 특수'). 셋 다 고르면 '+1'
export const useDamageClassFilter = (): CheckboxFilterState =>
  useCheckboxFilter({
    group: 'damageClass',
    title: DAMAGE_CLASS_FILTER_TITLE,
    summaryLimit: 2,
  });
