import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import MoveListSkeleton from './move-list/skeleton';
import MoveTableSkeleton from './move-table/skeleton';

// 화면을 채울 만큼만 그린다 (실제 한 페이지는 PAGE_SIZE개)
const CARD_COUNT = 6;
const TABLE_ROW_COUNT = 10;

/**
 * PageView와 같은 구조·크기로 자리를 잡는다 (App Shell에 들어가는 로딩 화면).
 * - 필터 줄: 높이 h-16 안에 트리거 둘(h-10). 초기화 버튼은 필터가 켜졌을 때만이라 그리지 않는다
 * - lg 미만: 결과 줄(개수 · 정렬) + 카드 / lg 이상: 개수는 필터 줄 끝, 표 머리글은 진짜로
 */
export default function PageViewSkeleton() {
  return (
    <div className="flex flex-col lg:gap-2">
      <span role="status" className="sr-only">
        기술 목록을 불러오는 중
      </span>
      <div aria-hidden className="flex flex-col">
        <Skeleton className="h-10.5 w-full rounded-4xl" />
        <div className="flex h-16 items-center gap-3">
          <div className="flex flex-1 items-center gap-2">
            <Skeleton className="h-10 w-20.5 rounded-4xl" />
            <Skeleton className="h-10 w-20.5 rounded-4xl" />
          </div>
          <div className="hidden flex-col items-end lg:flex">
            <div className="text-xs">
              <SkeletonLine className="w-8" />
            </div>
            <div className="text-xs">
              <SkeletonLine className="w-10" />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="flex flex-col gap-3">
        <div className="flex min-h-8 items-center justify-between gap-3 lg:hidden">
          <div className="text-sm">
            <SkeletonLine className="w-10" />
          </div>
          {/* 정렬 버튼 높이(h-10)만큼 줄이 높아진다 */}
          <div className="flex h-10 items-center text-sm">
            <SkeletonLine className="w-24" />
          </div>
        </div>
        <div className="lg:hidden">
          <MoveListSkeleton count={CARD_COUNT} />
        </div>
        <div className="hidden lg:block">
          <MoveTableSkeleton rowCount={TABLE_ROW_COUNT} />
        </div>
      </div>
    </div>
  );
}
