import { cn } from '@/_shared/lib/cn';
import { SkeletonLine } from '@/_shared/ui/skeleton';

import SortStateIcon from '../sort-state-icon';

interface AbilityTableSkeletonProps {
  rowCount: number;
}

/**
 * 머리글은 데이터가 필요 없어 진짜로 그린다 (열 이름·너비가 실제 표와 같아 데이터가 와도 움직이지 않는다).
 * 정렬 버튼은 누를 수 없게 글자·삼각형 모양만 (지금 정렬은 URL에서 읽으므로 모두 꺼진 모양).
 * 행은 TableRow와 같은 grid·높이로 자리만 잡는다 (설명은 대부분 한 줄이라 한 줄로).
 * 열 너비(grid-cols)는 table-header · table-row와 같은 값을 쓴다
 */
export default function AbilityTableSkeleton({
  rowCount,
}: AbilityTableSkeletonProps) {
  return (
    <div className="w-full">
      <div
        className={cn(
          'grid grid-cols-[minmax(9rem,1.75fr)_minmax(0,5fr)_6rem] items-center',
          'h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70',
        )}
      >
        <SortHeadSkeleton>이름</SortHeadSkeleton>
        <div className="px-4">설명</div>
        <SortHeadSkeleton>등장</SortHeadSkeleton>
      </div>
      {Array.from({ length: rowCount }, (_, index) => (
        <div
          key={index}
          className={cn(
            'grid grid-cols-[minmax(9rem,1.75fr)_minmax(0,5fr)_6rem] items-center',
            'h-16 border-b last:border-b-0',
          )}
        >
          <div className="px-4 text-md">
            <SkeletonLine className="w-24" />
          </div>
          <div className="px-4 text-md">
            <SkeletonLine className="w-4/5" />
          </div>
          <div className="px-4 text-md">
            <SkeletonLine className="w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 실제 정렬 버튼(h-9 gap-1.5, 좌우 여백은 -mx로 상쇄)과 같은 글자 위치
function SortHeadSkeleton({ children }: { children: string }) {
  return (
    <div className="px-4">
      <span className="inline-flex h-9 items-center gap-1.5">
        {children}
        <SortStateIcon order={null} />
      </span>
    </div>
  );
}
