import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import MoveListSkeleton from './move-list/skeleton';
import MoveTableSkeleton from './move-table/skeleton';

// 화면을 채울 만큼만 그린다 (실제 한 페이지는 PAGE_SIZE개)
const CARD_COUNT = 6;
const TABLE_ROW_COUNT = 10;

/**
 * PageView와 같은 구조·크기로 자리를 잡는다 (App Shell에 들어가는 로딩 화면).
 * - [검색 …… 필터 트리거] 한 줄
 * - lg 미만: 결과 줄(정렬) + 카드 / lg 이상: 표 머리글은 진짜로
 */
export default function PageViewSkeleton() {
  return (
    <div className="flex flex-col lg:gap-6">
      <span role="status" className="sr-only">
        기술 목록을 불러오는 중
      </span>
      <div aria-hidden className="flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-10.5 flex-1 rounded-4xl lg:max-w-2/5" />
          {/* 필터 트리거: lg 미만 아이콘(size-10.5), lg 이상 '필터' 글자까지 */}
          <Skeleton className="size-10.5 shrink-0 rounded-4xl lg:w-22" />
        </div>
      </div>
      <div aria-hidden className="flex flex-col gap-3">
        <div className="mt-3 flex min-h-8 items-center justify-end lg:hidden">
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
