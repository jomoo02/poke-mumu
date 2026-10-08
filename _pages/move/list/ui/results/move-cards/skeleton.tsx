import { cn } from '@/_shared/lib/cn';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

interface MoveCardsSkeletonProps {
  count: number;
}

// 세로 IconLabel 자리: 칸 w-10, 아이콘 size-7 + gap-1.5 + text-sm 이름
function IconLabelSkeleton() {
  return (
    <div className="flex w-10 flex-col items-center gap-1.5">
      <Skeleton className="size-7 rounded-sm" />
      <div className="text-sm">
        <SkeletonLine className="w-8" />
      </div>
    </div>
  );
}

// MoveCard와 같은 구조·글꼴 크기·간격으로 자리를 잡는다
export default function MoveCardsSkeleton({ count }: MoveCardsSkeletonProps) {
  return (
    <ul aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className={cn(
            'relative -mx-3 flex flex-col gap-5 px-3 py-5',
            'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
          )}
        >
          <div className="flex flex-col gap-2.5">
            <div className="text-sm">
              <SkeletonLine className="w-9" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <div className="text-lg font-medium">
                  <SkeletonLine className="w-32" />
                </div>
                <div className="text-sm">
                  <SkeletonLine className="w-40" />
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <IconLabelSkeleton />
                <IconLabelSkeleton />
              </div>
            </div>
          </div>

          {/* 수치 줄: w-20 칸 3개, text-md */}
          <div className="flex gap-x-4 text-md">
            <SkeletonLine className="w-16" />
            <SkeletonLine className="w-16" />
            <SkeletonLine className="w-12" />
          </div>
        </li>
      ))}
    </ul>
  );
}
