import { PageLayoutSection } from '@/_shared/ui/page-layout';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import MoveCardsSkeleton from './move-cards/skeleton';
import MoveTableSkeleton from './move-table/skeleton';

// 화면을 채울 만큼만 그린다(실제 한 페이지는 PAGE_SIZE개)
const TABLE_ROW_COUNT = 10;
const CARD_COUNT = 6;

// move-list-v3-view와 같은 구조·크기로 자리를 잡는다.
// 처음 진입은 필터가 없는 경우가 대부분이라 초기화 버튼(필터가 켜졌을 때만)은 그리지 않는다
export default function MoveListV3Skeleton() {
  return (
    <PageLayoutSection className="mt-2">
      <span role="status" className="sr-only">
        기술 목록을 불러오는 중
      </span>
      <div aria-hidden="true" className="flex flex-col gap-6">
        {/* toolbar: 검색(h-10.5) / 필터 트리거 둘(h-10) + 개수 (lg 미만은 개수·정렬이 다음 줄) */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10.5 w-full rounded-4xl" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex w-full gap-2 md:gap-3 lg:w-auto">
              <Skeleton className="h-10 w-28.5 rounded-4xl" />
              <Skeleton className="h-10 w-28.5 rounded-4xl" />
            </div>
            <div className="flex flex-1 items-center justify-between gap-6 lg:justify-end">
              <div className="text-sm">
                <SkeletonLine className="w-16" />
              </div>
              <Skeleton className="h-10 w-32 rounded-4xl lg:hidden" />
            </div>
          </div>
        </div>

        <section className="hidden w-full lg:block">
          <MoveTableSkeleton rowCount={TABLE_ROW_COUNT} />
        </section>
        <section className="-mt-2 lg:hidden">
          <MoveCardsSkeleton count={CARD_COUNT} />
        </section>
      </div>
    </PageLayoutSection>
  );
}
