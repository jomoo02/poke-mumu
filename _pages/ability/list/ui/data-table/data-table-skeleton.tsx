import { cn } from '@/_shared/lib/cn';
import { SkeletonLine } from '@/_shared/ui/skeleton';

import type { TableColumn } from './table-column';
import {
  BODY_ROW_CLASS,
  CELL_CLASS,
  GRID_ROW_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  getTableColsStyle,
} from './table-layout';

interface DataTableSkeletonProps<Row, K extends string> {
  columns: readonly TableColumn<Row, K>[];
  rowCount: number;
  className?: string;
}

// 헤더 라벨은 상수라 글자로 보여주고, 셀만 column.skeleton으로 채운다
export default function DataTableSkeleton<Row, K extends string>({
  columns,
  rowCount,
  className,
}: DataTableSkeletonProps<Row, K>) {
  return (
    <div
      aria-hidden="true"
      className={cn('w-full', className)}
      style={getTableColsStyle(columns)}
    >
      <div className={cn(HEADER_ROW_CLASS, GRID_ROW_CLASS)}>
        {columns.map((column) => (
          <div key={column.id} className={HEAD_CELL_CLASS}>
            {column.header}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {Array.from({ length: rowCount }, (_, index) => (
          <div key={index} className={cn(BODY_ROW_CLASS, GRID_ROW_CLASS)}>
            {columns.map((column) => (
              <div
                key={column.id}
                className={cn(CELL_CLASS, column.cellClassName)}
              >
                {column.skeleton ?? <SkeletonLine className="w-3/4" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
