import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import { STAT_KEYS } from '../../model/poke';

interface PokedexCardListSkeletonProps {
  count: number;
}

// Card와 같은 구조·글꼴 크기·간격으로 자리를 잡는다 (목록 격자도 PokedexCardList와 같다)
export default function PokedexCardListSkeleton({
  count,
}: PokedexCardListSkeletonProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className="flex flex-col gap-4 p-4 bg-card border rounded-4xl"
        >
          <div className="flex min-w-0 items-center gap-x-3.5 w-full">
            {/* 이미지 상자 size-16 */}
            <Skeleton className="size-16 shrink-0 rounded-2xl" />
            <div className="flex min-w-0 flex-1 flex-col gap-y-px">
              <div className="text-sm">
                <SkeletonLine className="w-14" />
              </div>
              <div className="text-md">
                <SkeletonLine className="w-24" />
              </div>
            </div>
            {/* 타입 아이콘 size-7 둘 */}
            <div className="grid shrink-0 grid-cols-2 gap-1">
              <Skeleton className="size-7 rounded-sm" />
              <Skeleton className="size-7 rounded-sm" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-x-1 w-full">
            {STAT_KEYS.map((statKey) => (
              <div
                key={statKey}
                className="flex flex-col gap-y-px items-center"
              >
                <div className="text-xs">
                  <SkeletonLine className="w-6" />
                </div>
                <div className="text-sm">
                  <SkeletonLine className="w-7" />
                </div>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
