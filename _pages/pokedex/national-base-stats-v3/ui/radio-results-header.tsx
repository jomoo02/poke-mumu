import RadioSortMenu from './radio-sort-menu';
import type { SortSheetUi } from '../model/use-sort-ui';

interface RadioResultsHeaderProps {
  totalCount: number;
  sheet: SortSheetUi;
}

// 목록 머리 줄: 개수 + 정렬(정렬 시트: radio·분리형·표형). 기존 results-header에서 정렬 메뉴만 바꿨다
export default function RadioResultsHeader({
  totalCount,
  sheet,
}: RadioResultsHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6">
      <p aria-live="polite" className="text-sm font-medium text-foreground/70">
        전체 {totalCount}개
      </p>
      <div>
        <RadioSortMenu sheet={sheet} />
      </div>
    </div>
  );
}
