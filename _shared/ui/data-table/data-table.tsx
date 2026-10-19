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
  // 헤더·행 grid에 덧붙일 클래스 (예: 열이 많아 간격을 줄일 때 'gap-3')
  rowClassName?: string;
}

function DataTable<Row, K extends string>({
  columns,
  rows,
  getRowKey,
  sortState,
  onSort,
  className,
  rowClassName,
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
        className={cn(GRID_ROW_CLASS, rowClassName)}
      />
      <div role="rowgroup" className="flex flex-col">
        {rows.map((row) => (
          <DataTableRow
            key={getRowKey(row)}
            row={row}
            columns={columns}
            className={cn(GRID_ROW_CLASS, rowClassName)}
          />
        ))}
      </div>
    </div>
  );
}

export { DataTable };
