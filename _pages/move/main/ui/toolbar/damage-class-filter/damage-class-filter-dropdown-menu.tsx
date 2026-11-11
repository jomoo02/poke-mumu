import {
  FilterMenu,
  FilterMenuCheckboxItem,
  FilterMenuContent,
  FilterMenuTrigger,
} from '@/_shared/ui/filter-v2';
import { DamageClassIcon } from '@/_entities/damage-class';

import CheckboxFilterTriggerText from '../checkbox-filter-trigger-text';
import type { CheckboxFilterState } from '../use-checkbox-filter';
import { DAMAGE_CLASS_FILTER_TITLE } from './use-damage-class-filter';

interface DamageClassFilterDropdownMenuProps {
  filter: CheckboxFilterState;
}

// md 이상: 드롭다운 메뉴
export default function DamageClassFilterDropdownMenu({
  filter,
}: DamageClassFilterDropdownMenuProps) {
  return (
    <FilterMenu>
      <FilterMenuTrigger
        active={filter.active}
        aria-label={filter.triggerLabel}
        className="shrink-0"
      >
        <CheckboxFilterTriggerText filter={filter} />
      </FilterMenuTrigger>
      <FilterMenuContent aria-label={DAMAGE_CLASS_FILTER_TITLE}>
        {filter.options.map(({ value, label, damageClass }) => (
          <FilterMenuCheckboxItem
            key={value}
            label={label}
            checked={filter.isChecked(value)}
            onCheckedChange={() => filter.toggle(value)}
          >
            {damageClass && (
              <DamageClassIcon damageClass={damageClass} decorative />
            )}
            <span className="min-w-0 truncate">{label}</span>
          </FilterMenuCheckboxItem>
        ))}
      </FilterMenuContent>
    </FilterMenu>
  );
}
