'use client';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import {
  LIST_MODES,
  LIST_MODE_LABEL,
  type ListMode,
} from '../model/use-list-mode';

interface ListModeSwitchProps {
  value: ListMode;
  onChange: (value: ListMode) => void;
}

// 비교용 임시 스위치. 목록 그리기 방식(가상화 / content-visibility)
export default function ListModeSwitch({
  value,
  onChange,
}: ListModeSwitchProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-foreground/70">목록 (비교용)</span>
      <div role="group" aria-label="목록 그리기 방식" className="flex gap-1">
        {LIST_MODES.map((mode) => (
          <Button
            key={mode}
            type="button"
            variant="secondary"
            aria-pressed={value === mode}
            onClick={() => onChange(mode)}
            className={cn(
              'h-8 rounded-full px-3 text-sm',
              value === mode
                ? 'bg-foreground text-background [@media(hover:hover)]:hover:bg-foreground/90'
                : 'bg-muted text-foreground/70',
            )}
          >
            {LIST_MODE_LABEL[mode]}
          </Button>
        ))}
      </div>
    </div>
  );
}
