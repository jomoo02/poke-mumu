import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import AbilityListSkeleton from './ability-list/skeleton';
import AbilityTableSkeleton from './ability-table/skeleton';

// 화면을 채울 만큼만 그린다 (실제 한 페이지는 PAGE_SIZE개)
const LIST_ROW_COUNT = 10;
const TABLE_ROW_COUNT = 10;

/**
 * PageView와 같은 구조·크기로 자리를 잡는다 (App Shell에 들어가는 로딩 화면).
 * - 검색 + lg 이상: h-16 줄 끝의 개수 두 줄
 * - lg 미만: 결과 줄(개수 · 정렬) + 한 줄 목록 / lg 이상: 표 머리글은 진짜로
 */
export default function PageViewSkeleton() {
  return (
    <div className="flex flex-col lg:gap-2">
      <span role="status" className="sr-only">
        특성 목록을 불러오는 중
      </span>
      <div aria-hidden className="flex flex-col">
        <Skeleton className="h-10.5 w-full rounded-4xl" />
        <div className="hidden h-16 flex-col items-end justify-center lg:flex">
          <div className="text-xs">
            <SkeletonLine className="w-8" />
          </div>
          <div className="text-xs">
            <SkeletonLine className="w-10" />
          </div>
        </div>
      </div>
      <div aria-hidden className="flex flex-col gap-3">
        <div className="mt-3 flex min-h-8 items-center justify-between gap-3 lg:hidden">
          <div className="text-sm">
            <SkeletonLine className="w-10" />
          </div>
          {/* 정렬 버튼 높이(h-10)만큼 줄이 높아진다 */}
          <div className="flex h-10 items-center text-sm">
            <SkeletonLine className="w-24" />
          </div>
        </div>
        <div className="lg:hidden">
          <AbilityListSkeleton count={LIST_ROW_COUNT} />
        </div>
        <div className="hidden lg:block">
          <AbilityTableSkeleton rowCount={TABLE_ROW_COUNT} />
        </div>
      </div>
    </div>
  );
}
