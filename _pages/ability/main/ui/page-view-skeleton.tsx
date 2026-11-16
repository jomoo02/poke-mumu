import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import AbilityListSkeleton from './ability-list/skeleton';
import AbilityTableSkeleton from './ability-table/skeleton';

// 화면을 채울 만큼만 그린다 (실제 한 페이지는 PAGE_SIZE개)
const LIST_ROW_COUNT = 10;
const TABLE_ROW_COUNT = 10;

/**
 * PageView와 같은 구조·크기로 자리를 잡는다 (App Shell에 들어가는 로딩 화면).
 * - 검색 한 줄
 * - 결과 줄(개수 · lg 미만 정렬) + lg 미만 카드 / lg 이상 표 (머리글은 진짜로)
 */
export default function PageViewSkeleton() {
  return (
    <div className="flex flex-col">
      <span role="status" className="sr-only">
        특성 목록을 불러오는 중
      </span>
      <Skeleton aria-hidden className="mb-3 h-11 w-full rounded-4xl" />
      <div aria-hidden className="flex flex-col gap-y-4">
        <div className="flex h-9.5 items-center justify-between gap-3">
          <div className="text-sm">
            <SkeletonLine className="w-10" />
          </div>
          <div className="flex items-center text-sm lg:hidden">
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
