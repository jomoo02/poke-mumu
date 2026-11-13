import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

interface AbilityListSkeletonProps {
  count: number;
}

// AbilityCard와 같은 카드 모양·높이·간격으로 자리를 잡는다
// [이름 ··········· 등장]
// [설명 두 줄 자리]
export default function AbilityListSkeleton({
  count,
}: AbilityListSkeletonProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className="flex h-full flex-col gap-y-1.5 px-4 py-3.5 rounded-2xl bg-card border"
        >
          <div className="flex justify-between gap-x-3.5">
            <div className="min-w-0 flex-1 text-base">
              <SkeletonLine className="w-24" />
            </div>
            {/* AppearedBadge: text-xs + py-1 = 24px */}
            <div className="flex h-6 w-14.5 justify-end">
              <Skeleton className="h-6 w-12 rounded-md" />
            </div>
          </div>
          {/* 설명 두 줄 자리(h-10.5). 짧은 설명이 많아 막대는 한 줄만 */}
          <div className="h-10.5 max-w-[90%] text-md">
            <SkeletonLine className="w-4/5" />
          </div>
        </li>
      ))}
    </ul>
  );
}
