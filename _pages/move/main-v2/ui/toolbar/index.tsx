import { MOVE_FILTER_GROUPS } from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import ResetConditionsButton from '../reset-conditions-button';
import ResultCount from '../result-count';
import Sort from '../sort';
import type { SortProps } from '../sort/sort-props';
import { GroupFilter } from './filter';

interface ToolbarProps extends SortProps {
  // 지금 결과 수 (필터 시트의 'N개 보기', 줄 끝의 개수)
  resultCount: number;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
}

/**
 * 필터 줄 (검색창은 제목 아래, index.tsx). [개수 | 정렬]은 늘 붙어 다닌다
 *   md 이상  [모든 타입 ⌄][모든 분류 ⌄] 초기화 ············ 120개 | 이름순 ⌄
 *   md 미만  [모든 타입 ⌄][모든 분류 ⌄] 초기화 → / 결과 줄 [120개 ······ 이름순 ⌄] (PageView)
 * 필터·초기화만 가로 스크롤 (모바일은 초기화가 스크롤 끝에 놓일 수 있다).
 * 고른 필터는 트리거 글자로 보여 칩 줄은 두지 않는다. 초기화는 검색어·필터가 있을 때만
 */
export default function Toolbar({
  resultCount,
  filterCounts,
  ...sortProps
}: ToolbarProps) {
  const resultLabel = `${resultCount.toLocaleString('ko-KR')}개 보기`;

  return (
    <div className="flex min-w-0 items-center gap-3 mt-0 md:mt-0 md:h-13">
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
      <div className="hidden shrink-0 items-center gap-3 md:flex">
        <ResultCount count={resultCount} />
        <div aria-hidden className="h-4 w-px bg-border" />
        <Sort {...sortProps} />
      </div>
    </div>
  );
}
