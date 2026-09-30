import { cn } from '@/_shared/lib/cn';
import { SkeletonLine } from '@/_shared/ui/skeleton';

import type { TableColumn } from './table-column';
import {
  BODY_ROW_CLASS,
  CELL_ALIGN_CLASS,
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
function DataTableSkeleton<Row, K extends string>({
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
        {/* 정렬 버튼 없이 라벨만 두므로 일반 헤더와 같은 정렬 클래스를 쓴다 */}
        {columns.map((column) => (
          <div
            key={column.id}
            className={cn(
              HEAD_CELL_CLASS,
              CELL_ALIGN_CLASS[column.align ?? 'left'],
            )}
          >
            {column.header}
            {/* 가운데·오른쪽 정렬 + 정렬 가능 열: 실제 헤더의 아이콘(gap-1.5 + size-4) 자리를 비워
                로딩 전후 라벨 위치를 맞춘다 */}
            {column.sortKey && (column.align ?? 'left') !== 'left' && (
              <span className="ml-1.5 inline-block w-4" />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {Array.from({ length: rowCount }, (_, index) => (
          <div key={index} className={cn(BODY_ROW_CLASS, GRID_ROW_CLASS)}>
            {columns.map((column) => (
              <div
                key={column.id}
                className={cn(
                  CELL_CLASS,
                  CELL_ALIGN_CLASS[column.align ?? 'left'],
                  column.cellClassName,
                )}
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

export { DataTableSkeleton };
