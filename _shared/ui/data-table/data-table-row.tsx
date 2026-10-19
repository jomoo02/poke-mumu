import type { ComponentProps } from 'react';

import { cn } from '@/_shared/lib/cn';

import type { TableColumn } from './table-column';
import { BODY_ROW_CLASS, CELL_ALIGN_CLASS, CELL_CLASS } from './table-layout';

// 나머지 props(ref·style·data-index·aria-rowindex)는 가상화 테이블이 행 위치를 잡는 데 쓴다
interface DataTableRowProps<Row, K extends string> extends Omit<
  ComponentProps<'div'>,
  'children'
> {
  row: Row;
  columns: readonly TableColumn<Row, K>[];
}

export default function DataTableRow<Row, K extends string>({
  row,
  columns,
  className,
  ...props
}: DataTableRowProps<Row, K>) {
  return (
    <div
      role="row"
      className={cn(
        BODY_ROW_CLASS,
        '[@media(hover:hover)]:hover:bg-muted/70',
        className,
      )}
      {...props}
    >
      {columns.map((column) => (
        <div
          key={column.id}
          role="cell"
          className={cn(
            CELL_CLASS,
            CELL_ALIGN_CLASS[column.align ?? 'left'],
            column.cellClassName,
          )}
        >
          {column.cell(row)}
        </div>
      ))}
    </div>
  );
}
