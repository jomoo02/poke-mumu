import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

import PokedexCardListSkeleton from './pokedex-card-list/skeleton';
import PokedexTableSkeleton from './pokedex-table/skeleton';

// 화면을 채울 만큼만 그린다 (실제 한 페이지는 PAGE_SIZE개)
const CARD_COUNT = 4;
const TABLE_ROW_COUNT = 10;

/**
 * PageView와 같은 구조·크기로 자리를 잡는다 (App Shell에 들어가는 로딩 화면).
 * PageView는 검색·필터·정렬·페이지를 URL에서 읽어, 링크마다 다른 그 부분은 shell에 들어갈 수 없다.
 * 그래서 shell은 캐시된 포켓몬 목록(props) + 이 skeleton이고, URL을 읽은 화면은 이동 직후 그 자리에 바뀐다.
 * - 필터 줄: 트리거 셋(h-10). 초기화 버튼은 필터가 켜졌을 때만이라 그리지 않는다 (첫 진입은 대부분 필터가 없다)
 * - lg 미만: 결과 줄(개수 · 정렬) + 카드 / lg 이상: 개수는 필터 줄 끝, 표 머리글은 진짜로
 */
export default function PageViewSkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      <span role="status" className="sr-only">
        포켓몬 목록을 불러오는 중
      </span>
      <div aria-hidden className="flex flex-col gap-3">
        <Skeleton className="h-10.5 w-full rounded-4xl" />
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2">
            <Skeleton className="h-10 w-20.5 rounded-4xl" />
            <Skeleton className="h-10 w-20.5 rounded-4xl" />
            <Skeleton className="h-10 w-20.5 rounded-4xl" />
          </div>
          <div className="hidden text-sm lg:block">
            <SkeletonLine className="w-20" />
          </div>
        </div>
      </div>
      <div aria-hidden className="flex flex-col gap-3">
        <div className="flex min-h-8 items-center justify-between gap-3 lg:hidden">
          <div className="text-sm">
            <SkeletonLine className="w-20" />
          </div>
          {/* 정렬 버튼 높이(h-10)만큼 줄이 높아진다 */}
          <div className="flex h-10 items-center text-sm">
            <SkeletonLine className="w-24" />
          </div>
        </div>
        <div className="lg:hidden">
          <PokedexCardListSkeleton count={CARD_COUNT} />
        </div>
        <div className="hidden lg:block">
          <PokedexTableSkeleton rowCount={TABLE_ROW_COUNT} />
        </div>
      </div>
    </div>
  );
}
