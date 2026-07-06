import type { Type } from '@/entities/type/model';

import { useTypeFilter, MAX_SELECTED_TYPES } from '../../model/type-filter';
import { getTypeTriggerText, isTypeSelectionFull } from './lib';

export default function useTypeFilterView(
  types: Type[],
  max: number = MAX_SELECTED_TYPES,
) {
  const { selectedTypes, toggleType, resetType } = useTypeFilter();

  const set = new Set(selectedTypes);
  const isSelectType = (identifier: string) => set.has(identifier);

  const isFull = isTypeSelectionFull(selectedTypes, max);
  const isDisableType = (identifier: string) =>
    !isSelectType(identifier) && isFull;

  const isActive = selectedTypes.length > 0;
  const triggerText = getTypeTriggerText(selectedTypes, types);

  return {
    toggleType,
    resetType,
    isSelectType,
    isDisableType,
    isActive,
    triggerText,
  };
}
