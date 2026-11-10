import {
  FilterMenu,
  FilterMenuCheckboxItem,
  FilterMenuContent,
  FilterMenuTrigger,
} from '@/_shared/ui/filter-v2';

import CheckboxFilterTriggerText from '../checkbox-filter-trigger-text';
import type { CheckboxFilterState } from '../use-checkbox-filter';
import { FORM_FILTER_TITLE } from './use-form-filter';

interface FormFilterDropdownMenuProps {
  filter: CheckboxFilterState;
}

// md 이상: 드롭다운 메뉴
export default function FormFilterDropdownMenu({
  filter,
}: FormFilterDropdownMenuProps) {
  return (
    <FilterMenu>
      <FilterMenuTrigger
        active={filter.active}
        aria-label={filter.triggerLabel}
        className="shrink-0"
      >
        <CheckboxFilterTriggerText filter={filter} />
      </FilterMenuTrigger>
      <FilterMenuContent aria-label={FORM_FILTER_TITLE}>
        {filter.options.map(({ value, label }) => (
          <FilterMenuCheckboxItem
            key={value}
            label={label}
            checked={filter.isChecked(value)}
            disabled={filter.isDisabled(value)}
            onCheckedChange={() => filter.toggle(value)}
          >
            <span className="min-w-0 truncate">{label}</span>
          </FilterMenuCheckboxItem>
        ))}
      </FilterMenuContent>
    </FilterMenu>
  );
}
