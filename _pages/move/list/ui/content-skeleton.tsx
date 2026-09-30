import { PageLayoutSection } from '@/_shared/ui/page-layout';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import MoveListSkeleton from './move-list/skeleton';
import MoveTableSkeleton from './move-table/skeleton';

// 화면을 채울 만큼만 그린다(실제 한 페이지는 PAGE_SIZE개)
const TABLE_ROW_COUNT = 10;
const LIST_ITEM_COUNT = 6;

// list/index.tsx의 MoveListContent(검색 + view-client)와 같은 구조로 자리를 잡는다
export default function MoveListContentSkeleton() {
  return (
    <>
      <PageLayoutSection className="mt-3">
        <span role="status" className="sr-only">
          기술 목록을 불러오는 중
        </span>
        {/* MoveSearch: InputGroup h-11 */}
        <Skeleton aria-hidden="true" className="h-11 w-full rounded-4xl" />
      </PageLayoutSection>

      <PageLayoutSection className="mt-0">
        <div aria-hidden="true" className="flex flex-col gap-6">
          {/* MoveToolbar: 필터 트리거 h-10.5 (타입 · 분류) */}
          <div className="flex gap-3 overflow-hidden">
            <Skeleton className="h-10.5 w-40 shrink-0 rounded-4xl" />
            <Skeleton className="h-10.5 w-36 shrink-0 rounded-4xl" />
          </div>

          {/* 목록 머리 줄: 개수 + 정렬(lg 미만만) */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="text-sm">
              <SkeletonLine className="w-20" />
            </div>
            {/* MoveSort: 기준 트리거 + 방향 토글(size-10.5) */}
            <div className="flex gap-2 lg:hidden">
              <Skeleton className="h-10.5 w-28 rounded-4xl" />
              <Skeleton className="size-10.5 rounded-4xl" />
            </div>
          </div>

          <section className="hidden w-full lg:block">
            <MoveTableSkeleton rowCount={TABLE_ROW_COUNT} />
          </section>
          <section className="-mt-2 lg:hidden">
            <MoveListSkeleton count={LIST_ITEM_COUNT} />
          </section>
        </div>
      </PageLayoutSection>
    </>
  );
}
