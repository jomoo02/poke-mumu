import {
  FilterSheet,
  FilterSheetBody,
  FilterSheetCheckboxGroup,
  FilterSheetCheckboxItem,
  FilterSheetContent,
  FilterSheetDone,
  FilterSheetFooter,
  FilterSheetTrigger,
} from '@/_shared/ui/filter-v2';
import { SheetHeader, SheetTitle } from '@/_shared/ui/sheet';
import { DamageClassIcon } from '@/_entities/damage-class';

import CheckboxFilterTriggerText from '../checkbox-filter-trigger-text';
import type { CheckboxFilterState } from '../use-checkbox-filter';
import { DAMAGE_CLASS_FILTER_TITLE } from './use-damage-class-filter';

interface DamageClassFilterSheetProps {
  filter: CheckboxFilterState;
  // 닫기 버튼 문구 ('120개 보기')
  resultLabel: string;
}

// md 미만: 바텀시트. 셋뿐이라 1열, 아래는 결과 수를 보여 주며 닫기만
export default function DamageClassFilterSheet({
  filter,
  resultLabel,
}: DamageClassFilterSheetProps) {
  return (
    <FilterSheet>
      <FilterSheetTrigger
        active={filter.active}
        aria-label={filter.triggerLabel}
        className="shrink-0"
      >
        <CheckboxFilterTriggerText filter={filter} />
      </FilterSheetTrigger>
      <FilterSheetContent>
        <SheetHeader>
          <SheetTitle>{DAMAGE_CLASS_FILTER_TITLE}</SheetTitle>
        </SheetHeader>
        <FilterSheetBody>
          <FilterSheetCheckboxGroup aria-label={DAMAGE_CLASS_FILTER_TITLE}>
            {filter.options.map(({ value, label, damageClass }) => (
              <FilterSheetCheckboxItem
                key={value}
                checked={filter.isChecked(value)}
                onCheckedChange={() => filter.toggle(value)}
              >
                {damageClass && (
                  <DamageClassIcon damageClass={damageClass} decorative />
                )}
                <span className="truncate">{label}</span>
              </FilterSheetCheckboxItem>
            ))}
          </FilterSheetCheckboxGroup>
        </FilterSheetBody>
        <FilterSheetFooter>
          <FilterSheetDone>{resultLabel}</FilterSheetDone>
        </FilterSheetFooter>
      </FilterSheetContent>
    </FilterSheet>
  );
}
