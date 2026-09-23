import { cn } from '@/_shared/lib/cn';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

interface AbilityListSkeletonProps {
  count: number;
}

// AbilityItem과 같은 구조·글꼴 크기·간격으로 자리를 잡는다
export default function AbilityListSkeleton({
  count,
}: AbilityListSkeletonProps) {
  return (
    <ul aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className={cn(
            'relative -mx-3 flex flex-col gap-4 px-3 py-4',
            'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
          )}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="text-lg font-medium">
                <SkeletonLine className="w-24" />
              </div>
              {/* AppearedBadge: text-xs(16px) + py-1 = 24px */}
              <Skeleton className="h-6 w-12" />
            </div>
            <div className="text-sm">
              <SkeletonLine className="w-40" />
            </div>
          </div>
          {/* 설명은 대부분 1줄이라 1줄로 둔다(2줄인 항목만 로드 후 조금 늘어난다) */}
          <div className="text-md">
            <SkeletonLine className="w-4/5" />
          </div>
        </li>
      ))}
    </ul>
  );
}
