'use client';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import {
  SORT_SHEET_UIS,
  SORT_SHEET_UI_LABEL,
  useSortSheetUi,
} from '../model/use-sort-sheet-ui';

interface SortSheetSwitchProps {
  className?: string;
}

// 비교용 임시 스위치. radio·분리형·표형은 md 미만에서만 차이가 보이고, 정렬 메뉴는 모든 폭에서 보인다
export default function SortSheetSwitch({ className }: SortSheetSwitchProps) {
  const { sortSheetUi, setSortSheetUi } = useSortSheetUi();

  return (
    <div className={cn('flex flex-wrap items-center gap-2 text-sm', className)}>
      <span className="shrink-0 font-medium text-foreground/70">
        정렬 시트 (비교용)
      </span>
      <div role="group" aria-label="정렬 시트" className="flex flex-wrap gap-1">
        {SORT_SHEET_UIS.map((ui) => (
          <Button
            key={ui}
            type="button"
            variant="secondary"
            aria-pressed={sortSheetUi === ui}
            onClick={() => setSortSheetUi(ui)}
            className={cn(
              'h-8 rounded-full px-3 text-sm',
              sortSheetUi === ui
                ? 'bg-foreground text-background [@media(hover:hover)]:hover:bg-foreground/90'
                : 'bg-muted text-foreground/70',
            )}
          >
            {SORT_SHEET_UI_LABEL[ui]}
          </Button>
        ))}
      </div>
    </div>
  );
}
