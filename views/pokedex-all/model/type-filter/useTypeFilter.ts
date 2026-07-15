import { useSearchParamsState } from '../search-params';
import { MAX_SELECTED_TYPES } from './config';

export function useTypeFilter(max: number = MAX_SELECTED_TYPES) {
  const { searchParams, toggleParam, setParams } = useSearchParamsState();

  const selectedTypes = searchParams.getAll('type').filter(Boolean);
  const selectedTypeSet = new Set(selectedTypes);

  const isSelectedType = (identifier: string) =>
    selectedTypeSet.has(identifier);

  // 상한 도달 시 미선택 항목은 disabled(더 못 고름).
  const isFull = selectedTypes.length >= max;
  const isDisabledType = (identifier: string) =>
    !isSelectedType(identifier) && isFull;

  const isActive = selectedTypes.length > 0;

  const toggleType = (identifier: string) => toggleParam('type', identifier);

  const resetType = () => setParams({ type: null });

  return {
    selectedTypes,
    isSelectedType,
    isDisabledType,
    isActive,
    toggleType,
    resetType,
  };
}
