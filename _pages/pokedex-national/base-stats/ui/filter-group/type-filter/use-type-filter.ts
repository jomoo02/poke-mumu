import { POKE_FILTER_RULES } from '../../../model/filter';
import {
  useCheckboxFilter,
  type CheckboxFilterState,
} from '../use-checkbox-filter';

export const TYPE_FILTER_TITLE = '타입';

// 복합 타입이라 최대 2개
export const TYPE_FILTER_MAX = POKE_FILTER_RULES.type.max ?? 2;

// 다 골라도 2개라 트리거에 이름을 모두 보인다 ('타입: 불꽃 / 비행')
export const useTypeFilter = (): CheckboxFilterState =>
  useCheckboxFilter({
    group: 'type',
    title: TYPE_FILTER_TITLE,
    summaryLimit: TYPE_FILTER_MAX,
  });
