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

import CheckboxFilterTriggerText from '../checkbox-filter-trigger-text';
import type { CheckboxFilterState } from '../use-checkbox-filter';
import { FORM_FILTER_TITLE } from './use-form-filter';

interface FormFilterSheetProps {
  filter: CheckboxFilterState;
  // 닫기 버튼 문구 ('120마리 보기')
  resultLabel: string;
}

// md 미만: 바텀시트. 1열 (이름이 길다), 아래는 결과 수를 보여 주며 닫기만
export default function FormFilterSheet({
  filter,
  resultLabel,
}: FormFilterSheetProps) {
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
          <SheetTitle>{FORM_FILTER_TITLE}</SheetTitle>
        </SheetHeader>
        <FilterSheetBody>
          <FilterSheetCheckboxGroup
            aria-label={FORM_FILTER_TITLE}
            className="grid-cols-1"
          >
            {filter.options.map(({ value, label }) => (
              <FilterSheetCheckboxItem
                key={value}
                checked={filter.isChecked(value)}
                disabled={filter.isDisabled(value)}
                onCheckedChange={() => filter.toggle(value)}
              >
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
