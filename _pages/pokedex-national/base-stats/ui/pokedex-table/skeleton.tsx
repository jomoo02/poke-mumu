import { cn } from '@/_shared/lib/cn';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import { STAT_KEYS } from '../../model/poke';
import SortStateIcon from '../sort-state-icon';
import {
  GRID_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  INFO_COLUMNS,
  SORTABLE_HEAD_ALIGN_CLASS,
  STAT_COLUMNS,
  TABLE_VARS,
} from './table-layout';

interface PokedexTableSkeletonProps {
  rowCount: number;
}

/**
 * 머리글은 데이터가 필요 없어 진짜로 그린다 (열 이름·너비가 실제 표와 같아 데이터가 와도 움직이지 않는다).
 * 정렬 버튼은 누를 수 없게 글자·삼각형 모양만 (지금 정렬은 URL에서 읽으므로 모두 꺼진 모양).
 * 행은 TableRow와 같은 grid·높이로 자리만 잡는다
 */
export default function PokedexTableSkeleton({
  rowCount,
}: PokedexTableSkeletonProps) {
  return (
    <div style={TABLE_VARS} className="w-full">
      <div className={cn(HEADER_ROW_CLASS, GRID_CLASS)}>
        {[...INFO_COLUMNS, ...STAT_COLUMNS].map((column) => (
          <div
            key={column.id}
            className={cn(
              HEAD_CELL_CLASS,
              column.sortKey && SORTABLE_HEAD_ALIGN_CLASS[column.align],
            )}
          >
            {column.sortKey ? (
              // 실제 정렬 버튼(h-9 gap-1.5, 좌우 여백은 -mx로 상쇄)과 같은 글자 위치
              <span className="inline-flex h-9 items-center gap-1.5">
                {column.header}
                <SortStateIcon order={null} />
              </span>
            ) : (
              column.header
            )}
          </div>
        ))}
      </div>
      {Array.from({ length: rowCount }, (_, index) => (
        <div
          key={index}
          className={cn(GRID_CLASS, 'h-17.5 border-b last:border-b-0')}
        >
          <div className="flex items-center gap-x-3.5 px-4">
            <Skeleton className="size-12.5 shrink-0 rounded-xl" />
            <div className="flex flex-1 justify-center text-md">
              <SkeletonLine className="w-10" />
            </div>
          </div>
          <div className="px-4 text-md">
            <SkeletonLine className="w-24" />
          </div>
          <div className="flex gap-1 px-4">
            <Skeleton className="size-7 rounded-sm" />
            <Skeleton className="size-7 rounded-sm" />
          </div>
          {STAT_KEYS.map((statKey) => (
            <div key={statKey} className="flex justify-end px-4 text-md">
              <SkeletonLine className="w-7" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
