import { PageLayoutSection } from '@/_shared/ui/page-layout';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import PokeListSkeleton from './results/poke-list/skeleton';
import PokeTableSkeleton from './results/poke-table/skeleton';

// 화면을 채울 만큼만 그린다(실제 한 페이지는 PAGE_SIZE개)
const TABLE_ROW_COUNT = 10;
const LIST_COUNT = 8;

// index.tsx의 NationalBaseStatsContent(national-base-stats-view)와 같은 구조·크기로 자리를 잡는다.
// 처음 진입은 필터가 없는 경우가 대부분이라 초기화 버튼(필터가 켜졌을 때만)은 그리지 않는다
export default function NationalBaseStatsSkeleton() {
  return (
    <PageLayoutSection className="mt-2">
      <span role="status" className="sr-only">
        포켓몬 목록을 불러오는 중
      </span>
      <div aria-hidden="true" className="flex flex-col gap-6">
        {/* toolbar: 1줄 검색(h-10.5) + md 미만 필터 버튼(size-10.5) / 2줄 md 이상 타입 필터 트리거(h-10) */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Skeleton className="h-10.5 min-w-0 flex-1 rounded-4xl" />
            <Skeleton className="size-10.5 shrink-0 rounded-xl md:hidden" />
          </div>
          <div className="hidden gap-3 md:flex">
            <Skeleton className="h-10 w-28.5 rounded-4xl" />
          </div>
        </div>

        {/* results-header: 전체 N개 + 정렬 메뉴 [정렬: 도감번호 ▾ │ ↑](h-10) */}
        <div className="flex items-center justify-between gap-6">
          <div className="text-sm">
            <SkeletonLine className="w-16" />
          </div>
          <Skeleton className="h-10 w-45 rounded-4xl" />
        </div>

        {/* 테이블·리스트 전환 기준은 results/index.tsx와 같다 */}
        <div className="@container">
          <section className="hidden w-full @5xl:block">
            <PokeTableSkeleton rowCount={TABLE_ROW_COUNT} />
          </section>
          <section className="-mt-2 @5xl:hidden">
            <PokeListSkeleton count={LIST_COUNT} />
          </section>
        </div>
      </div>
    </PageLayoutSection>
  );
}
