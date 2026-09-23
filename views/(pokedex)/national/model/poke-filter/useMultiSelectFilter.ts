import { useSearchParamsState } from '../search-params';

export function useMultiSelectFilter(key: string, max?: number) {
  const { searchParams, toggleParam, setParams } = useSearchParamsState();

  const selected = searchParams.getAll(key).filter(Boolean);
  const selectedSet = new Set(selected);

  const isSelected = (id: string) => selectedSet.has(id);

  const isFull = max != null && selected.length >= max;
  const isDisabled = (id: string) => !isSelected(id) && isFull;

  const isActive = selected.length > 0;
  const toggle = (id: string) => toggleParam(key, id);
  const reset = () => setParams({ [key]: null });

  return { selected, isSelected, isDisabled, isActive, toggle, reset };
}
