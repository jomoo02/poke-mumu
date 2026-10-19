'use client';

import type { Ref } from 'react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import type { MoveSort, SortKey } from '@/_pages/move/list/model/move-sort';

import styles from './head-sync.module.css';
import {
  CELL_ALIGN_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  LG_GRID_CLASS,
  LEAD_COLUMNS,
  REST_COLUMNS,
  REST_GRID_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
  getLeadCellClass,
  type MoveColumn,
} from './table-layout';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;
const SORT_ICON = { asc: ArrowUpIcon, desc: ArrowDownIcon } as const;

interface MoveTableHeadProps {
  ref?: Ref<HTMLDivElement>;
  sortState: MoveSort;
  onSort: (sortKey: SortKey) => void;
  // 가로로 움직일 칸들 (scroll-driven animation 대상)
  trackRef: Ref<HTMLDivElement>;
}

// [앞 칸(#·이름)] + [overflow-hidden 래퍼 > track(나머지 칸)]
// 헤더는 가로 스크롤 박스 밖에 있어 window 기준 sticky가 유지된다
export default function MoveTableHead({
  ref,
  sortState,
  onSort,
  trackRef,
}: MoveTableHeadProps) {
  return (
    <div
      ref={ref}
      role="row"
      className={cn(HEADER_ROW_CLASS, 'flex', LG_GRID_CLASS)}
    >
      <div role="none" className="flex w-(--lead-w) shrink-0 lg:contents">
        {LEAD_COLUMNS.map((column) => (
          <HeadCell
            key={column.id}
            column={column}
            sortState={sortState}
            onSort={onSort}
            className={cn(
              'flex items-center lg:block',
              getLeadCellClass(column),
            )}
          />
        ))}
      </div>
      <div role="none" className="min-w-0 flex-1 overflow-hidden lg:contents">
        <div
          ref={trackRef}
          role="none"
          className={cn(
            styles.headTrack,
            REST_GRID_CLASS,
            'h-full min-w-(--rest-min) will-change-transform',
          )}
        >
          {REST_COLUMNS.map((column) => (
            <HeadCell
              key={column.id}
              column={column}
              sortState={sortState}
              onSort={onSort}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface HeadCellProps {
  column: MoveColumn;
  sortState: MoveSort;
  onSort: (sortKey: SortKey) => void;
  className?: string;
}

// _shared/ui/data-table의 SortableHead와 같은 모양 (공개 API가 아니라 복사)
function HeadCell({ column, sortState, onSort, className }: HeadCellProps) {
  const align = column.align ?? 'left';

  if (!column.sortKey) {
    return (
      <div
        role="columnheader"
        className={cn(HEAD_CELL_CLASS, CELL_ALIGN_CLASS[align], className)}
      >
        {column.header}
      </div>
    );
  }

  const sortKey = column.sortKey;

  // 이 컬럼이 활성 정렬이면 방향, 아니면 null
  const order = sortState.sort === sortKey ? sortState.order : null;
  const Icon = order ? SORT_ICON[order] : ArrowUpDownIcon;

  return (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={cn(
        HEAD_CELL_CLASS,
        SORTABLE_HEAD_ALIGN_CLASS[align],
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() => onSort(sortKey)}
        className={cn(
          '-mx-2.5 h-9 rounded-lg px-2.5 group',
          order && 'text-foreground hover:text-foreground font-semibold',
        )}
      >
        {column.header}
        <Icon
          aria-hidden="true"
          className={cn(
            'size-4',
            !order &&
              'text-foreground/50 group-hover:text-foreground transition-colors',
          )}
        />
      </Button>
    </div>
  );
}
