'use client';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { SortByMenu } from '@/_shared/ui/sort-menu';
import { useMoveSort } from '@/_pages/move/list/model/move-sort';

import MoveSortSheet from './move-sort-sheet';
import { useSortSheetUi } from '../../model/use-sort-sheet-ui';
import SortChoiceSelect from './sort-choice-select';
import {
  MOVE_SORT_GROUPS,
  MOVE_SORT_MATRIX_OPTIONS,
} from '../../model/move-sort-option';
import { useMoveSortChoice } from '../../model/use-move-sort-choice';

// _shared/ui/sort-menu의 기준 칸과 같은 모양 (방향 칸이 없어 양쪽 모두 둥글다)
const TRIGGER_CLASS = cn(
  'group h-10 gap-1.5 rounded-4xl border border-border pr-3 pl-4 text-sm font-medium text-foreground transition-none',
  'cursor-pointer bg-transparent dark:bg-input/50',
  '[@media(hover:hover)]:hover:bg-muted dark:[@media(hover:hover)]:hover:bg-input/70',
  'active:bg-muted dark:active:bg-input/70',
  'aria-expanded:bg-muted dark:aria-expanded:bg-input/70',
);

interface MoveSortMenuProps {
  className?: string;
}

// [위력 높은 순 ▾] 지금 정렬(기준 + 방향)을 한 이름으로 보여준다. 테이블 머리글 정렬과 같은 URL 상태를 쓴다
// - md 미만: 바텀시트 (radio / 분리형 / 표형, 비교용 ?sortui=)
// - md 이상: 기준과 방향을 한 선택지로 묶은 셀렉트 (순서 4개 + 수치 6개)
// 정렬 메뉴(?sortui=menu)면 모든 화면 폭에서 정렬 메뉴(팝오버) 하나
export default function MoveSortMenu({ className }: MoveSortMenuProps) {
  const { selected, select } = useMoveSortChoice();

  const { sortSheetUi } = useSortSheetUi();

  const { sortState, setSort } = useMoveSort();

  const trigger = (
    <Button
      type="button"
      aria-label={`정렬: ${selected.label}`}
      className={TRIGGER_CLASS}
    >
      {selected.label}
      <ChevronDownIcon
        aria-hidden
        className="size-4.5 text-foreground/70 transition-transform duration-200 group-data-popup-open:rotate-180"
      />
    </Button>
  );

  if (sortSheetUi === 'menu') {
    return (
      <div className={className}>
        <SortByMenu
          options={MOVE_SORT_MATRIX_OPTIONS}
          selectedKey={sortState.sort}
          direction={sortState.order}
          onSelect={(sort, order) => setSort({ sort, order })}
          trigger={trigger}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="md:hidden">
        <MoveSortSheet trigger={trigger} />
      </div>
      <div className="hidden md:block">
        <SortChoiceSelect
          groups={MOVE_SORT_GROUPS}
          selectedKey={selected.key}
          onSelect={select}
          trigger={trigger}
        />
      </div>
    </div>
  );
}
