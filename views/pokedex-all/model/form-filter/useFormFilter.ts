import { useSearchParamsState } from '../search-params';

export function useFormFilter() {
  const { searchParams, toggleParam, setParams } = useSearchParamsState();

  const selectedForms = searchParams.getAll('form').filter(Boolean);

  const selectedFormSet = new Set(selectedForms);

  const isSelectedForm = (formIdentifier: string) =>
    selectedFormSet.has(formIdentifier);

  const isActive = selectedForms.length > 0;

  const toggleForm = (formIdentifier: string) =>
    toggleParam('form', formIdentifier);

  const resetForm = () => setParams({ form: null });

  return {
    selectedForms,
    isSelectedForm,
    isActive,
    toggleForm,
    resetForm,
  };
}
