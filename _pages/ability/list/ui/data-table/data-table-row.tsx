import { cn } from '@/_shared/lib/cn';

import type { TableColumn } from './table-column';
import { BODY_ROW_CLASS, CELL_CLASS } from './table-layout';

interface DataTableRowProps<Row, K extends string> {
  row: Row;
  columns: readonly TableColumn<Row, K>[];
  className?: string;
}

export default function DataTableRow<Row, K extends string>({
  row,
  columns,
  className,
}: DataTableRowProps<Row, K>) {
  return (
    <div
      role="row"
      className={cn(
        BODY_ROW_CLASS,
        '[@media(hover:hover)]:hover:bg-muted/70',
        className,
      )}
    >
      {columns.map((column) => (
        <div
          key={column.id}
          role="cell"
          className={cn(CELL_CLASS, column.cellClassName)}
        >
          {column.cell(row)}
        </div>
      ))}
    </div>
  );
}
