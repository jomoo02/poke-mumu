import { MOVE_FILTER_GROUPS } from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import SearchBar from '../search-bar';
import { GroupFilter } from './filter';

interface ToolbarProps {
  // 지금 결과 수 (필터 시트의 'N개 보기')
  resultCount: number;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
  // 정렬 칩 (PageView가 채운다). md 미만만 보인다 (md 이상은 표 머리글로 정렬)
  sort: React.ReactNode;
}

/**
 * 툴바: [정렬][필터…] + 검색. 결과 수는 목록 아래 ('N개 중 a–b', PageView)
 *   md 이상  [모든 타입 ⌄][모든 분류 ⌄] ···················· [검색]   (한 줄, 표 툴바)
 *   md 미만  [검색 ··························]                       (넓은 검색, 카드 목록)
 *            [↕ 이름순 ⌄][모든 타입 ⌄][모든 분류 ⌄] →
 * 코드 순서는 데스크탑 화면 순서(검색이 맨 뒤)에 맞춘다: Tab 이동이 잦은 쪽이 화면과 같게.
 * md 미만만 CSS(order)로 검색을 맨 위로 올린다 (모바일 스크린리더는 정렬·필터를 먼저 읽는다)
 * 정렬·필터는 가로 스크롤. 고른 필터는 트리거 글자로 보여 칩 줄은 두지 않는다.
 * 전체 초기화는 두지 않는다: 조건이 적어 하나씩 지운다 (검색 ✕ · 필터마다 초기화 · 결과 없음 안내의 초기화)
 */
export default function Toolbar({
  resultCount,
  filterCounts,
  sort,
}: ToolbarProps) {
  const resultLabel = `${resultCount.toLocaleString('ko-KR')}개 보기`;

  // 간격: md 미만 검색 → 필터 줄 16px (gap-4). md 이상은 한 줄: 필터끼리 8px, 필터 줄 → 검색 16px (gap-4).
  // 위아래 여백은 두지 않는다 (바깥에서 준다)
  return (
    <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center">
      {/* p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게 */}
      <div className="-m-1 p-1 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
        {sort}
        {MOVE_FILTER_GROUPS.map((group) => (
          <GroupFilter
            key={group}
            group={group}
            resultLabel={resultLabel}
            filterCounts={filterCounts}
          />
        ))}
      </div>
      {/* md 미만은 맨 위 넓은 검색(44), md 이상은 줄 끝에 필터와 같은 높이(40) */}
      <SearchBar className="order-first h-11 w-full md:order-0 md:h-10 md:w-56 md:shrink-0 lg:w-72" />
    </div>
  );
}
