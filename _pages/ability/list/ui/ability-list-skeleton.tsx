import { PageLayoutSection } from '@/_shared/ui/page-layout';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import AbilityCardsSkeleton from './results/ability-cards/skeleton';
import AbilityTableSkeleton from './results/ability-table/skeleton';

// 화면을 채울 만큼만 그린다(실제 한 페이지는 PAGE_SIZE개)
const TABLE_ROW_COUNT = 10;
const CARD_COUNT = 6;

// index.tsx의 AbilityListContent(ability-list-view)와 같은 구조·크기로 자리를 잡는다
export default function AbilityListSkeleton() {
  return (
    <PageLayoutSection className="mt-2">
      <span role="status" className="sr-only">
        특성 목록을 불러오는 중
      </span>
      <div aria-hidden="true" className="flex flex-col gap-6">
        {/* 검색(h-10.5) */}
        <Skeleton className="h-10.5 w-full rounded-4xl" />

        {/* results-header: 전체 N개 + 정렬 메뉴 [정렬: 특성번호 ▾ │ ↑](h-10) */}
        <div className="flex items-center justify-between gap-6">
          <div className="text-sm">
            <SkeletonLine className="w-16" />
          </div>
          <Skeleton className="h-10 w-45 rounded-4xl" />
        </div>

        <section className="hidden w-full lg:block">
          <AbilityTableSkeleton rowCount={TABLE_ROW_COUNT} />
        </section>
        <section className="-mt-2 lg:hidden">
          <AbilityCardsSkeleton count={CARD_COUNT} />
        </section>
      </div>
    </PageLayoutSection>
  );
}
