import { cn } from '@/_shared/lib/cn';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import SortStateIcon from '../sort-state-icon';

interface MoveTableSkeletonProps {
  rowCount: number;
}

/**
 * 머리글은 데이터가 필요 없어 진짜로 그린다 (열 이름·너비가 실제 표와 같아 데이터가 와도 움직이지 않는다).
 * 정렬 버튼은 누를 수 없게 글자·삼각형 모양만 (지금 정렬은 URL에서 읽으므로 모두 꺼진 모양).
 * 행은 TableRow와 같은 grid·높이로 자리만 잡는다.
 * 열 너비(grid-cols)는 table-header · table-row와 같은 값을 쓴다
 */
export default function MoveTableSkeleton({
  rowCount,
}: MoveTableSkeletonProps) {
  return (
    <div className="w-full">
      <div
        className={cn(
          'grid items-center',
          'grid-cols-[minmax(9rem,1.5fr)_minmax(4.5rem,0.6fr)_minmax(4.5rem,0.6fr)_minmax(5.5rem,0.75fr)_minmax(5.5rem,0.75fr)_minmax(5rem,0.65fr)_minmax(0,3.25fr)]',
          'h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70',
        )}
      >
        <SortHeadSkeleton>이름</SortHeadSkeleton>
        <div className="px-4">타입</div>
        <div className="px-4">분류</div>
        <SortHeadSkeleton className="flex justify-end">위력</SortHeadSkeleton>
        <SortHeadSkeleton className="flex justify-end">명중</SortHeadSkeleton>
        <SortHeadSkeleton className="flex justify-end">PP</SortHeadSkeleton>
        <div className="px-4">설명</div>
      </div>
      {Array.from({ length: rowCount }, (_, index) => (
        <div
          key={index}
          className={cn(
            'grid items-center',
            'grid-cols-[minmax(9rem,1.5fr)_minmax(4.5rem,0.6fr)_minmax(4.5rem,0.6fr)_minmax(5.5rem,0.75fr)_minmax(5.5rem,0.75fr)_minmax(5rem,0.65fr)_minmax(0,3.25fr)]',
            'h-16 border-b last:border-b-0',
          )}
        >
          <div className="px-4 text-md">
            <SkeletonLine className="w-24" />
          </div>
          <div className="px-4">
            <Skeleton className="size-7 rounded-sm" />
          </div>
          <div className="px-4">
            <Skeleton className="size-7 rounded-sm" />
          </div>
          {['power', 'accuracy', 'pp'].map((key) => (
            <div key={key} className="flex justify-end px-4 text-md">
              <SkeletonLine className="w-7" />
            </div>
          ))}
          <div className="px-4 text-md">
            <SkeletonLine className="w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 실제 정렬 버튼(h-9 gap-1.5, 좌우 여백은 -mx로 상쇄)과 같은 글자 위치
function SortHeadSkeleton({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  return (
    <div className={cn('px-4', className)}>
      <span className="inline-flex h-9 items-center gap-1.5">
        {children}
        <SortStateIcon order={null} />
      </span>
    </div>
  );
}
