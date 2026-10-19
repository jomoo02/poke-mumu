'use client';

import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import type { ColumnAlign, SortState, TableColumn } from './table-column';
import {
  CELL_ALIGN_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
} from './table-layout';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;
const SORT_ICON = { asc: ArrowUpIcon, desc: ArrowDownIcon } as const;

interface DataTableHeaderProps<Row, K extends string> {
  columns: readonly TableColumn<Row, K>[];
  sortState: SortState<K>;
  onSort: (sortKey: K) => void;
  className?: string;
  // 가상화 테이블: 일부 행만 그리므로 행 순번을 알린다 (머리글 = 1)
  rowIndex?: number;
}

export default function DataTableHeader<Row, K extends string>({
  columns,
  sortState,
  onSort,
  className,
  rowIndex,
}: DataTableHeaderProps<Row, K>) {
  return (
    <div
      role="row"
      aria-rowindex={rowIndex}
      className={cn(HEADER_ROW_CLASS, className)}
    >
      {columns.map((column) =>
        column.sortKey ? (
          <SortableHead
            key={column.id}
            label={column.header}
            ariaLabel={column.headerLabel}
            sortKey={column.sortKey}
            align={column.align ?? 'left'}
            sortState={sortState}
            onSort={onSort}
          />
        ) : (
          <div
            key={column.id}
            role="columnheader"
            className={cn(
              HEAD_CELL_CLASS,
              CELL_ALIGN_CLASS[column.align ?? 'left'],
            )}
          >
            {column.headerLabel ? (
              <>
                <span aria-hidden>{column.header}</span>
                <span className="sr-only">{column.headerLabel}</span>
              </>
            ) : (
              column.header
            )}
          </div>
        ),
      )}
    </div>
  );
}

interface SortableHeadProps<K extends string> {
  label: string;
  // 있으면 버튼의 접근 이름 (화면 글자 label 대신)
  ariaLabel?: string;
  sortKey: K;
  align: ColumnAlign;
  sortState: SortState<K>;
  onSort: (sortKey: K) => void;
}

function SortableHead<K extends string>({
  label,
  ariaLabel,
  sortKey,
  align,
  sortState,
  onSort,
}: SortableHeadProps<K>) {
  // 이 컬럼이 활성 정렬이면 방향, 아니면 null
  const order = sortState.sort === sortKey ? sortState.order : null;
  const Icon = order ? SORT_ICON[order] : ArrowUpDownIcon;

  return (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={cn(HEAD_CELL_CLASS, SORTABLE_HEAD_ALIGN_CLASS[align])}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() => onSort(sortKey)}
        aria-label={ariaLabel}
        className={cn(
          '-mx-2.5 h-9 rounded-lg px-2.5 group',
          order && 'text-foreground hover:text-foreground font-semibold',
        )}
      >
        {label}
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
