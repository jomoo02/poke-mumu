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
}

export default function DataTableHeader<Row, K extends string>({
  columns,
  sortState,
  onSort,
  className,
}: DataTableHeaderProps<Row, K>) {
  return (
    <div role="row" className={cn(HEADER_ROW_CLASS, className)}>
      {columns.map((column) =>
        column.sortKey ? (
          <SortableHead
            key={column.id}
            label={column.header}
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
            {column.header}
          </div>
        ),
      )}
    </div>
  );
}

interface SortableHeadProps<K extends string> {
  label: string;
  sortKey: K;
  align: ColumnAlign;
  sortState: SortState<K>;
  onSort: (sortKey: K) => void;
}

function SortableHead<K extends string>({
  label,
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
        className={cn(
          '-mx-2.5 h-9 rounded-lg px-2.5',
          // 굵기는 그대로(font-medium) 두고, 지금 정렬 중인 헤더만 글자를 진하게
          order && 'text-foreground hover:text-foreground',
        )}
      >
        {label}
        <Icon
          aria-hidden="true"
          className={cn('size-4', !order && 'opacity-50')}
        />
      </Button>
    </div>
  );
}
