import { MOVE_FILTER_GROUPS } from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import ResetConditionsButton from '../reset-conditions-button';
import { GroupFilter } from './filter';

interface ToolbarProps {
  // 지금 결과 수 (필터 시트의 'N개 보기')
  resultCount: number;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
  // 필터 줄 오른쪽(md 이상)·아래(md 미만) 자리: [개수 | 정렬] (PageView가 채운다)
  children: React.ReactNode;
}

/**
 * 필터 줄 (검색창은 제목 아래, index.tsx). 오른쪽 자리(children)는 PageView가 [개수 | 정렬]로 채운다
 *   md 이상  [모든 타입 ⌄][모든 분류 ⌄] 초기화 ············ children
 *   md 미만  [모든 타입 ⌄][모든 분류 ⌄] 초기화 →
 *            children (다음 줄)
 * 필터·초기화만 가로 스크롤 (모바일은 초기화가 스크롤 끝에 놓일 수 있다).
 * 고른 필터는 트리거 글자로 보여 칩 줄은 두지 않는다. 초기화는 검색어·필터가 있을 때만
 */
export default function Toolbar({
  resultCount,
  filterCounts,
  children,
}: ToolbarProps) {
  const resultLabel = `${resultCount.toLocaleString('ko-KR')}개 보기`;

  // md 미만: 필터 줄 → [개수 …… 정렬] 줄 8px (gap-2).
  // 위아래 여백은 두지 않는다 (검색과 12px, 콘텐츠와 16px은 바깥에서 준다)
  return (
    <div className="flex min-w-0 flex-col gap-2 md:flex-row md:items-center">
      {/* p-1 -m-1: 포커스 링이 스크롤 영역에 잘리지 않게 */}
      <div className="-m-1 p-1 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar ">
        {MOVE_FILTER_GROUPS.map((group) => (
          <GroupFilter
            key={group}
            group={group}
            resultLabel={resultLabel}
            filterCounts={filterCounts}
          />
        ))}
        <ResetConditionsButton className="mr-0 px-2" />
      </div>
      {/* md 이상: 줄 끝 [개수 | 정렬]. md 미만은 PageView의 결과 줄 */}
      {/* <div className="hidden shrink-0 items-center gap-3 md:flex">
        <ResultCount count={resultCount} />
        <div aria-hidden className="h-4 w-px bg-border" />
        <Sort {...sortProps} />
      </div> */}
      <div>{children}</div>
    </div>
  );
}
