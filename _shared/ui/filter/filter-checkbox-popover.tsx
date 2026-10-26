'use client';

import { ControlResetButton } from '@/_shared/ui/control';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';

import { FilterCheckboxList } from './filter-checkbox-list';
import { FilterCheckboxTitleText } from './filter-checkbox-title';
import type { FilterCheckboxGroup } from './filter-group';
import { FilterTrigger } from './filter-trigger';

// 팝오버 폭: 열 수에 맞춘다. 많으면 세로로 스크롤 (/pokedex/national과 같다)
const POPOVER_WIDTH: Record<FilterCheckboxGroup['columns'], string> = {
  1: 'w-58',
  2: 'w-114',
  3: 'w-114 lg:w-170',
};

interface FilterCheckboxPopoverProps {
  group: FilterCheckboxGroup;
  className?: string;
}

// md 이상: [모든 타입 ⌄] → 체크박스 팝오버. 헤더의 초기화는 이 그룹만. 바깥을 누르거나 Esc로 닫는다
export function FilterCheckboxPopover({
  group,
  className,
}: FilterCheckboxPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={<FilterTrigger group={group} className={className} />}
      />
      <PopoverContent className={POPOVER_WIDTH[group.columns]}>
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle>
            <FilterCheckboxTitleText group={group} />
          </PopoverTitle>
          <ControlResetButton
            onClick={group.onReset}
            disabled={group.selected.length === 0}
          />
        </PopoverHeader>
        {/* p-2 -m-2: 줄 호버 배경(라벨 양옆으로 넓다)과 포커스 링이 스크롤 영역에 잘리지 않게 */}
        <div className="-m-2 max-h-100 overflow-y-auto no-scrollbar p-2">
          <FilterCheckboxList group={group} place="popover" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
