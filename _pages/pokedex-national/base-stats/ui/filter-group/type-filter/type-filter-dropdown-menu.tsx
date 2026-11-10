import {
  FilterMenu,
  FilterMenuCheckboxItem,
  FilterMenuContent,
  FilterMenuTrigger,
} from '@/_shared/ui/filter-v2';
import { TypeIcon } from '@/_entities/type';

import { TYPE_FILTER_TITLE } from './use-type-filter';
import CheckboxFilterTriggerText from '../checkbox-filter-trigger-text';
import type { CheckboxFilterState } from '../use-checkbox-filter';

interface TypeFilterDropdownMenuProps {
  filter: CheckboxFilterState;
}

// md 이상: 드롭다운 메뉴. 18개라 메뉴 높이를 넘으면 스크롤
export default function TypeFilterDropdownMenu({
  filter,
}: TypeFilterDropdownMenuProps) {
  return (
    <FilterMenu>
      <FilterMenuTrigger
        active={filter.active}
        aria-label={filter.triggerLabel}
        className="shrink-0"
      >
        <CheckboxFilterTriggerText filter={filter} />
      </FilterMenuTrigger>
      <FilterMenuContent aria-label={TYPE_FILTER_TITLE} className="w-60">
        {filter.options.map(({ value, label, type }) => (
          <FilterMenuCheckboxItem
            key={value}
            label={label}
            checked={filter.isChecked(value)}
            disabled={filter.isDisabled(value)}
            onCheckedChange={() => filter.toggle(value)}
          >
            {type && <TypeIcon type={type} decorative />}
            <span className="min-w-0 truncate">{label}</span>
          </FilterMenuCheckboxItem>
        ))}
      </FilterMenuContent>
    </FilterMenu>
  );
}
