import type { Key } from 'react';

import { cn } from '@/_shared/lib/cn';

import DataTableHeader from './data-table-header';
import DataTableRow from './data-table-row';
import type { SortState, TableColumn } from './table-column';
import { GRID_ROW_CLASS, getTableColsStyle } from './table-layout';

interface DataTableProps<Row, K extends string> {
  columns: readonly TableColumn<Row, K>[];
  rows: readonly Row[];
  getRowKey: (row: Row) => Key;
  sortState: SortState<K>;
  onSort: (sortKey: K) => void;
  className?: string;
}

export default function DataTable<Row, K extends string>({
  columns,
  rows,
  getRowKey,
  sortState,
  onSort,
  className,
}: DataTableProps<Row, K>) {
  return (
    <div
      role="table"
      className={cn('w-full', className)}
      style={getTableColsStyle(columns)}
    >
      <DataTableHeader
        columns={columns}
        sortState={sortState}
        onSort={onSort}
        className={GRID_ROW_CLASS}
      />
      <div role="rowgroup" className="flex flex-col">
        {rows.map((row) => (
          <DataTableRow
            key={getRowKey(row)}
            row={row}
            columns={columns}
            className={GRID_ROW_CLASS}
          />
        ))}
      </div>
    </div>
  );
}

export { default as DataTableSkeleton } from './data-table-skeleton';

export type { SortOrder, SortState, TableColumn } from './table-column';
