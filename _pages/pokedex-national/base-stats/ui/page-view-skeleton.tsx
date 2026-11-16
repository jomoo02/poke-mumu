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
 * - [검색 …… 필터 트리거] 한 줄. 칩 줄은 고른 필터가 있을 때만이라 그리지 않는다
 * - 결과 줄(개수 · lg 미만 정렬) + lg 미만 카드 / lg 이상 표 (머리글은 진짜로)
 */
export default function PageViewSkeleton() {
  return (
    <div className="flex flex-col">
      <span role="status" className="sr-only">
        포켓몬 목록을 불러오는 중
      </span>
      <div aria-hidden className="mb-3 flex items-center justify-between gap-3">
        <Skeleton className="h-11 flex-1 rounded-4xl" />
        {/* 필터 트리거: lg 미만 아이콘(size-11), lg 이상 '필터' 글자까지 */}
        <Skeleton className="size-11 shrink-0 rounded-4xl lg:w-20.5" />
      </div>
      <div aria-hidden className="flex flex-col gap-y-4">
        <div className="flex h-9.5 items-center justify-between gap-3">
          <div className="text-sm">
            <SkeletonLine className="w-14" />
          </div>
          <div className="flex items-center text-sm lg:hidden">
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
