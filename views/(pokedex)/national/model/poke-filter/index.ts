import { SEARCH_PARAM_KEYS } from '../search-params';

interface FilterItem {
  identifier: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterConfig {
  paramKey: (typeof SEARCH_PARAM_KEYS)[keyof typeof SEARCH_PARAM_KEYS];
  title: string;
  defaultTriggerLabel: string;
  description: string;
  items: FilterItem[];
  max?: number;
  columns?: 1 | 2 | 3;
}

export { useMultiSelectFilter } from './useMultiSelectFilter';
export { type FilterItem, type FilterConfig };
