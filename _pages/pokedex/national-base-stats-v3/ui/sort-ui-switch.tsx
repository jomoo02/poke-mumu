'use client';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { SORT_UIS, SORT_UI_LABEL, type SortUi } from '../model/use-sort-ui';

interface SortUiSwitchProps {
  value: SortUi;
  onChange: (value: SortUi) => void;
}

// 비교용 임시 스위치. 좁은 본문(테이블이 2줄 행일 때)에서만 차이가 보인다
export default function SortUiSwitch({ value, onChange }: SortUiSwitchProps) {
  return (
    // 선택지가 늘어 좁은 화면에서 넘치지 않게 줄바꿈한다
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="shrink-0 font-medium text-foreground/70">
        정렬 UI (비교용)
      </span>
      <div role="group" aria-label="정렬 UI" className="flex flex-wrap gap-1">
        {SORT_UIS.map((ui) => (
          <Button
            key={ui}
            type="button"
            variant="secondary"
            aria-pressed={value === ui}
            onClick={() => onChange(ui)}
            className={cn(
              'h-8 rounded-full px-3 text-sm',
              value === ui
                ? 'bg-foreground text-background [@media(hover:hover)]:hover:bg-foreground/90'
                : 'bg-muted text-foreground/70',
            )}
          >
            {SORT_UI_LABEL[ui]}
          </Button>
        ))}
      </div>
    </div>
  );
}
