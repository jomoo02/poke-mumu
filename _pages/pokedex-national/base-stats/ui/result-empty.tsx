import { SearchIcon } from 'lucide-react';

import { Button } from '@/_shared/ui/button';
import { focusVisibleFilterTrigger } from '@/_shared/ui/filter';

import { useFilterParam } from '../model/filter';
import { useKeywordParam } from '../model/search';

/**
 * 결과 0개. 흔한 빈 결과 패턴으로 가운데에 아이콘 · 제목 · 한 줄 안내 · 초기화 버튼 하나를 둔다
 * (원인별 문구·버튼은 두지 않는다. 결정 2026-11-11).
 * 초기화는 검색어와 필터를 함께 지우고 정렬은 둔다
 */
export default function ResultEmpty() {
  const { clearKeyword } = useKeywordParam();

  const { resetFilters } = useFilterParam();

  // 같은 틱의 두 쓰기는 nuqs가 URL 갱신 한 번으로 합친다 (각 쓰기는 이미 비어 있으면 건너뛴다)
  const resetConditions = () => {
    clearKeyword();
    resetFilters();
  };

  return (
    <div className="flex flex-col gap-3 py-12 items-center">
      <div className="bg-muted size-12 flex items-center justify-center rounded-lg">
        <SearchIcon className="size-6 text-foreground/50 dark:text-foreground/70" />
      </div>
      <div className="flex flex-col items-center">
        <p className="font-medium text-lg">검색 결과가 없어요</p>
        <p className="text-md text-foreground/70">
          조건에 맞는 포켓몬을 찾지 못했어요
        </p>
      </div>

      {/* 누르면 결과가 생겨 이 화면이 사라지므로 포커스를 지금 보이는 필터 트리거로 */}
      <Button
        variant="ghost"
        onClick={() => {
          resetConditions();
          focusVisibleFilterTrigger();
        }}
        className="font-semibold hover:dark:bg-transparent hover:opacity-70 hover:text-[#1447e6] text-[#1447e6] hover:bg-transparent cursor-pointer"
      >
        초기화
      </Button>
    </div>
  );
}
