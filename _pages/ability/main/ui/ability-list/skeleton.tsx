import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import { LIST_GRID_CLASS } from './list-layout';

interface AbilityListSkeletonProps {
  count: number;
}

// Row와 같은 카드 모양·높이·간격으로 자리를 잡는다
export default function AbilityListSkeleton({
  count,
}: AbilityListSkeletonProps) {
  return (
    <ul className={LIST_GRID_CLASS}>
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className="flex h-14 items-center gap-x-3.5 px-4 rounded-2xl bg-card border"
        >
          <div className="w-9 shrink-0 text-sm">
            <SkeletonLine className="w-6" />
          </div>
          <div className="min-w-0 flex-1 text-md">
            <SkeletonLine className="w-24" />
          </div>
          {/* AppearedBadge: text-xs + py-1 = 24px */}
          <Skeleton className="h-6 w-12 shrink-0" />
        </li>
      ))}
    </ul>
  );
}
