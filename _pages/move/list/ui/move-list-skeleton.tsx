import { PageLayoutSection } from '@/_shared/ui/page-layout';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import MoveCardsSkeleton from './results/move-cards/skeleton';
import MoveTableSkeleton from './results/move-table/skeleton';

// 화면을 채울 만큼만 그린다(실제 한 페이지는 PAGE_SIZE개)
const TABLE_ROW_COUNT = 10;
const CARD_COUNT = 6;

// index.tsx의 MoveListContent(move-list-view)와 같은 구조·크기로 자리를 잡는다.
// 처음 진입은 필터가 없는 경우가 대부분이라 초기화 버튼(필터가 켜졌을 때만)은 그리지 않는다
export default function MoveListSkeleton() {
  return (
    <PageLayoutSection className="mt-2">
      <span role="status" className="sr-only">
        기술 목록을 불러오는 중
      </span>
      <div aria-hidden="true" className="flex flex-col gap-6">
        {/* toolbar: 1줄 검색(h-10.5) + md 미만 필터 버튼(size-10.5) / 2줄 md 이상 필터 트리거 둘(h-10) */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Skeleton className="h-10.5 min-w-0 flex-1 rounded-4xl" />
            <Skeleton className="size-10.5 shrink-0 rounded-xl md:hidden" />
          </div>
          <div className="hidden gap-3 md:flex">
            <Skeleton className="h-10 w-28.5 rounded-4xl" />
            <Skeleton className="h-10 w-28.5 rounded-4xl" />
          </div>
        </div>

        {/* results-header: 전체 N개 + 정렬 메뉴 [정렬: 기술번호 ▾ │ ↑](h-10) */}
        <div className="flex items-center justify-between gap-6">
          <div className="text-sm">
            <SkeletonLine className="w-16" />
          </div>
          <Skeleton className="h-10 w-45 rounded-4xl" />
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
