import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { SkeletonLine } from '@/_shared/ui/skeleton';
import { PokeCardHorizontalSkeleton } from '@/_entities/poke';

// 화면을 채울 만큼만 그린다
const POKE_COUNT = 6;

// detail/index.tsx와 같은 구조로 자리를 잡는다.
// 보유 형태(일반/숨겨진/조건부)는 데이터에 따라 달라 그룹 하나만 그린다
export default function AbilityDetailPageSkeleton() {
  return (
    <PageLayoutContainer>
      <span role="status" className="sr-only">
        특성 정보를 불러오는 중
      </span>
      <div aria-hidden="true" className="contents">
        <PageLayoutHeader>
          <div className="text-4xl">
            <SkeletonLine className="w-40" />
          </div>
          <div className="text-lg">
            <SkeletonLine className="w-48" />
          </div>
          <div className="pt-3">
            <SkeletonLine className="w-full max-w-md" />
          </div>
        </PageLayoutHeader>

        <PageLayoutSection className="gap-y-4">
          <div className="text-xl">
            <SkeletonLine className="w-20" />
          </div>
          <SkeletonLine className="w-12" />
        </PageLayoutSection>

        <PageLayoutSection>
          <div className="text-xl">
            <SkeletonLine className="w-36" />
          </div>
          {/* PokeList */}
          <div className="mt-3 flex flex-col gap-4">
            <div className="text-lg">
              <SkeletonLine className="w-28" />
            </div>
            <div className="@container">
              <div className="grid gap-x-8 gap-y-4 @min-[600px]:grid-cols-2 @min-[1000px]:grid-cols-3">
                {Array.from({ length: POKE_COUNT }, (_, i) => (
                  <PokeCardHorizontalSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </PageLayoutSection>
      </div>
    </PageLayoutContainer>
  );
}
