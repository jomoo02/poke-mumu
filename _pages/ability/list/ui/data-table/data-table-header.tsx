'use client';

import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import type { SortState, TableColumn } from './table-column';
import { HEADER_ROW_CLASS, HEAD_CELL_CLASS } from './table-layout';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;
const SORT_ICON = { asc: ChevronUpIcon, desc: ChevronDownIcon } as const;

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
            sortState={sortState}
            onSort={onSort}
          />
        ) : (
          <div key={column.id} role="columnheader" className={HEAD_CELL_CLASS}>
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
  sortState: SortState<K>;
  onSort: (sortKey: K) => void;
}

function SortableHead<K extends string>({
  label,
  sortKey,
  sortState,
  onSort,
}: SortableHeadProps<K>) {
  // 이 컬럼이 활성 정렬이면 방향, 아니면 null
  const order = sortState.sort === sortKey ? sortState.order : null;
  const Icon = order ? SORT_ICON[order] : ChevronsUpDownIcon;

  return (
    <div
      role="columnheader"
      aria-sort={order ? ARIA_SORT[order] : 'none'}
      className={HEAD_CELL_CLASS}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() => onSort(sortKey)}
        className={cn(
          '-mx-2.5 h-9 rounded-lg px-2.5',
          order && 'text-foreground',
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
