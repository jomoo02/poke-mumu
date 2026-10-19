import ModeSortMenu from './mode-sort-menu';

interface ModeResultsHeaderProps {
  totalCount: number;
}

// 목록 머리 줄: 개수 + 정렬(선택지 5개). 기존 results-header에서 정렬 메뉴만 바꿨다
export default function ModeResultsHeader({
  totalCount,
}: ModeResultsHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6">
      <p aria-live="polite" className="text-sm font-medium text-foreground/70">
        전체 {totalCount}개
      </p>
      <div>
        <ModeSortMenu />
      </div>
    </div>
  );
}
