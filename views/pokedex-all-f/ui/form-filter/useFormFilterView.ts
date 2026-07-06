import { useFormFilter, formFilterOptions } from '../../model/form-filter';
import { getFormTriggerText } from './lib';

export default function useFormFilterView() {
  const { selectedForms, toggleForm, resetForm } = useFormFilter();

  const set = new Set(selectedForms);
  const checkSelectedForm = (formIdentifier: string) => set.has(formIdentifier);

  const isActive = selectedForms.length > 0;
  const triggerText = getFormTriggerText(selectedForms, formFilterOptions);

  return {
    toggleForm,
    resetForm,
    checkSelectedForm,
    isActive,
    triggerText,
    formFilterOptions,
  };
}
