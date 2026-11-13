import { useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { focusVisibleFilterTrigger } from '@/_shared/ui/filter';

import { useFilterParam } from '../../model/filter';
import ResultCount from '../result-count';
import FormFilter from './form-filter';
import GenFilter from './gen-filter';
import SearchBar from './search-bar';
import TypeFilter from './type-filter';

interface PokedexFilterProps {
  // 지금 결과 수 (lg 이상 줄 끝 개수, 모바일 시트의 'N마리 보기')
  resultCount: number;
}

/**
 * 검색 + 묶음별 필터 (2026-10-30 결정: 표 페이지 툴바).
 * 데스크톱은 묶음마다 드롭다운 메뉴(1열 체크박스), 모바일은 묶음마다 바텀시트. 통합 시트는 쓰지 않는다.
 * [검색]
 * [↻ 초기화] | [타입⌄] [모습⌄] [세대⌄]          개수(lg 이상)
 *                ← 트리거만 가로 스크롤 (lg 미만은 개수가 결과 줄에)
 * 초기화는 필터 전체 하나뿐이다 (묶음이 몇 개 없어 묶음별 초기화는 두지 않는다. 결정 2026-11-04).
 * 고른 필터가 있을 때만 왼쪽에 나타난다 (나타날 때 트리거 줄이 오른쪽으로 밀리는 것은 감수).
 * 아이콘만 (접근 이름 '필터 모두 지우기'). 누르면 사라지므로 포커스를 지금 보이는 첫 필터 트리거로
 */
export default function PokedexFilter({ resultCount }: PokedexFilterProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const { isFilterActive, resetFilters } = useFilterParam();

  const resultLabel = `${resultCount.toLocaleString('ko-KR')}마리 보기`;

  return (
    <div ref={rootRef} className="flex flex-col lg:flex-row lg:gap-x-3.5">
      <SearchBar />
      <div className="flex min-w-0 items-center gap-3 h-16 lg:h-auto">
        {isFilterActive && (
          <>
            <Button
              variant="ghost"
              onClick={() => {
                resetFilters();
                if (rootRef.current) {
                  focusVisibleFilterTrigger(rootRef.current);
                }
              }}
              aria-label="필터 모두 지우기"
              className={cn(
                'size-10 shrink-0 cursor-pointer',
                'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
              )}
            >
              <RotateCwIcon aria-hidden className="size-3.75" />
            </Button>

            <div aria-hidden className="h-5 w-px shrink-0 bg-border" />
          </>
        )}

        <div className="-m-1 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar p-1">
          <TypeFilter resultLabel={resultLabel} />
          <FormFilter resultLabel={resultLabel} />
          <GenFilter resultLabel={resultLabel} />
        </div>
        <ResultCount stacked className="hidden lg:flex" count={resultCount} />
      </div>
    </div>
  );
}
