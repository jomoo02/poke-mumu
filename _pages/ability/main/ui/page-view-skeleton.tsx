import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import AbilityListSkeleton from './ability-list/skeleton';
import AbilityTableSkeleton from './ability-table/skeleton';

// 화면을 채울 만큼만 그린다 (실제 한 페이지는 PAGE_SIZE개)
const LIST_ROW_COUNT = 10;
const TABLE_ROW_COUNT = 10;

/**
 * PageView와 같은 구조·크기로 자리를 잡는다 (App Shell에 들어가는 로딩 화면).
 * - 검색 한 줄
 * - lg 미만: 결과 줄(정렬) + 카드 목록 / lg 이상: 표 머리글은 진짜로
 */
export default function PageViewSkeleton() {
  return (
    <div className="flex flex-col lg:gap-6">
      <span role="status" className="sr-only">
        특성 목록을 불러오는 중
      </span>
      <Skeleton
        aria-hidden
        className="h-10.5 w-full rounded-4xl lg:max-w-2/5"
      />
      <div aria-hidden className="flex flex-col gap-3">
        <div className="mt-3 flex min-h-8 items-center justify-end lg:hidden">
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
