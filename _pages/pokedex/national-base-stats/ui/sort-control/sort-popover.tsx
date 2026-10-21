'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/_shared/ui/popover';

import SortChoices, { SORT_TITLE, type SortPanelProps } from './sort-choices';
import SortTrigger from './sort-trigger';
import { useSortPanel } from './use-sort-panel';

// md 이상: 팝오버. 바깥을 누르거나 Esc로 닫아 닫기 버튼이 없다 (필터·이름 언어 팝오버와 같다)
export default function SortPopover({
  sortState,
  onSelectKey,
  onSelectOrder,
}: SortPanelProps) {
  const { open, onOpenChange, close, shownOrderSort } = useSortPanel(sortState);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        render={
          <SortTrigger
            sortState={sortState}
            className="hidden md:inline-flex"
          />
        }
      />
      {/* 버튼이 결과 줄 오른쪽 끝이라 오른쪽을 맞춘다.
          제목 없이 소제목(정렬 기준·순서)만 둔다. 접근 이름은 aria-label */}
      <PopoverContent align="end" aria-label={SORT_TITLE} className="w-108 p-6">
        <SortChoices
          sortState={sortState}
          shownOrderSort={shownOrderSort}
          onSelectKey={onSelectKey}
          onSelectOrder={onSelectOrder}
          close={close}
          place="popover"
          className="gap-y-4"
        />
      </PopoverContent>
    </Popover>
  );
}
