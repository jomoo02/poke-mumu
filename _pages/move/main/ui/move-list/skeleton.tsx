import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

interface MoveListSkeletonProps {
  count: number;
}

// MoveCard와 같은 카드 모양·글꼴 크기·간격으로 자리를 잡는다
export default function MoveListSkeleton({ count }: MoveListSkeletonProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className="flex h-full flex-col px-4 gap-1.5 py-3.5 rounded-2xl bg-card border"
        >
          <div className="flex gap-3.5">
            <div className="flex flex-1 items-center text-base">
              <SkeletonLine className="w-24" />
            </div>
            {/* 타입·분류 아이콘 size-7 둘 */}
            <div className="flex shrink-0 gap-1">
              <Skeleton className="size-7 rounded-sm" />
              <Skeleton className="size-7 rounded-sm" />
            </div>
          </div>
          {/* 수치 줄: '위력 40' 셋 */}
          <div className="flex items-center gap-x-3.5 pt-0.5 text-md">
            {Array.from({ length: 3 }, (_, statIndex) => (
              <SkeletonLine key={statIndex} className="w-14" />
            ))}
          </div>
          {/* 설명 두 줄 자리(pt-2 + h-12.5). 모바일 폭에선 대부분 두 줄 */}
          <div className="flex h-12.5 max-w-[92%] flex-col pt-2 text-md">
            <SkeletonLine className="w-full" />
            <SkeletonLine className="w-3/5" />
          </div>
        </li>
      ))}
    </ul>
  );
}
