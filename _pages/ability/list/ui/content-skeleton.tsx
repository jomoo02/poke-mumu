import { PageLayoutSection } from '@/_shared/ui/page-layout';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import AbilityListSkeleton from './ability-list/skeleton';
import AbilityTableSkeleton from './ability-table/skeleton';

// 화면을 채울 만큼만 그린다(실제 한 페이지는 PAGE_SIZE개)
const TABLE_ROW_COUNT = 10;
const LIST_ITEM_COUNT = 6;

// list/index.tsx의 AbilityListContent(검색 + view-client)와 같은 구조로 자리를 잡는다
export default function AbilityListContentSkeleton() {
  return (
    <>
      <PageLayoutSection className="mt-3">
        <span role="status" className="sr-only">
          특성 목록을 불러오는 중
        </span>
        {/* AbilitySearch: InputGroup h-11 */}
        <Skeleton aria-hidden="true" className="h-11 w-full rounded-4xl" />
      </PageLayoutSection>

      <PageLayoutSection className="mt-0">
        <div aria-hidden="true" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="text-sm">
              <SkeletonLine className="w-20" />
            </div>
            {/* AbilitySort 트리거: h-10.5 */}
            <Skeleton className="h-10.5 w-28 rounded-4xl lg:hidden" />
          </div>

          <section className="hidden w-full lg:block">
            <AbilityTableSkeleton rowCount={TABLE_ROW_COUNT} />
          </section>
          <section className="-mt-2 lg:hidden">
            <AbilityListSkeleton count={LIST_ITEM_COUNT} />
          </section>
        </div>
      </PageLayoutSection>
    </>
  );
}
