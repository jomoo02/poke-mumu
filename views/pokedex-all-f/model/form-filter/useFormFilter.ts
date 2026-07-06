import { useSearchParamsState } from '../search-params';

export function useFormFilter() {
  const { searchParams, toggle, update } = useSearchParamsState();

  const selectedForms = searchParams.getAll('form').filter(Boolean);

  const toggleForm = (formIdentifier: string) => toggle('form', formIdentifier);

  const resetForm = () => update({ form: null });

  return {
    selectedForms,
    toggleForm,
    resetForm,
  };
}
