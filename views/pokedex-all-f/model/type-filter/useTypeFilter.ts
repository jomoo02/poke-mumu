import { useSearchParamsState } from '../search-params';

export function useTypeFilter() {
  const { searchParams, toggle, update } = useSearchParamsState();

  const selectedTypes = searchParams.getAll('type').filter(Boolean);

  const toggleType = (identifier: string) => toggle('type', identifier);

  const resetType = () => update({ type: null });

  return {
    selectedTypes,
    toggleType,
    resetType,
  };
}
