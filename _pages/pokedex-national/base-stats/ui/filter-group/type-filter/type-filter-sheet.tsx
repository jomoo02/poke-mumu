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
import { SheetDescription, SheetHeader, SheetTitle } from '@/_shared/ui/sheet';
import { TypeIcon } from '@/_entities/type';

import { TYPE_FILTER_MAX, TYPE_FILTER_TITLE } from './use-type-filter';
import CheckboxFilterTriggerText from '../checkbox-filter-trigger-text';
import type { CheckboxFilterState } from '../use-checkbox-filter';

interface TypeFilterSheetProps {
  filter: CheckboxFilterState;
  // 닫기 버튼 문구 ('120마리 보기')
  resultLabel: string;
}

// md 미만: 바텀시트. 2열, 머리글에 최대 개수 안내, 아래는 결과 수를 보여 주며 닫기만
export default function TypeFilterSheet({
  filter,
  resultLabel,
}: TypeFilterSheetProps) {
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
          <SheetTitle>{TYPE_FILTER_TITLE}</SheetTitle>
          {/* <SheetDescription>최대 {TYPE_FILTER_MAX}개</SheetDescription> */}
        </SheetHeader>
        <FilterSheetBody>
          <FilterSheetCheckboxGroup
            aria-label={TYPE_FILTER_TITLE}
            className="grid-cols-2"
          >
            {filter.options.map(({ value, label, type }) => (
              <FilterSheetCheckboxItem
                key={value}
                checked={filter.isChecked(value)}
                disabled={filter.isDisabled(value)}
                onCheckedChange={() => filter.toggle(value)}
              >
                {type && <TypeIcon type={type} decorative />}
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
