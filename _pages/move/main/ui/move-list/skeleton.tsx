import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import {
  CARD_CLASS,
  FIRST_ROW_CLASS,
  LIST_GRID_CLASS,
  STAT_ROW_CLASS,
} from './list-layout';

interface MoveListSkeletonProps {
  count: number;
}

// Card와 같은 카드 모양·글꼴 크기·간격으로 자리를 잡는다
export default function MoveListSkeleton({ count }: MoveListSkeletonProps) {
  return (
    <ul className={LIST_GRID_CLASS}>
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className={CARD_CLASS}>
          <div className={FIRST_ROW_CLASS}>
            <div className="w-9 shrink-0 text-sm">
              <SkeletonLine className="w-6" />
            </div>
            <div className="min-w-0 flex-1 text-md">
              <SkeletonLine className="w-24" />
            </div>
            {/* 타입·분류 아이콘 size-7 둘 */}
            <div className="flex shrink-0 gap-1">
              <Skeleton className="size-7 rounded-sm" />
              <Skeleton className="size-7 rounded-sm" />
            </div>
          </div>
          {/* 수치 칩: text-sm(줄 높이 20px) + py-0.75 = 26px. 폭은 '위력 40' 정도 */}
          <div className={STAT_ROW_CLASS}>
            {Array.from({ length: 3 }, (_, statIndex) => (
              <Skeleton key={statIndex} className="h-6.5 w-17 rounded-lg" />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
