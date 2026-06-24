'use client';

import { Button } from '@/shared/ui/button';
import { FORM_FILTERS } from '../model/forms';
import { cn } from '@/shared/lib/cn';
import { Toggle } from '@/shared/ui/toggle';

interface FormFilterProps {
  selected: string[];
  onToggle: (identifier: string) => void;
}

// 모습 필터: flex-wrap 칩, OR(무제한). controlled.
export default function FormFilter({ selected, onToggle }: FormFilterProps) {
  const set = new Set(selected);

  return (
    <div className="flex flex-wrap gap-2.5">
      {FORM_FILTERS.map(({ identifier, label }) => {
        const active = set.has(identifier);

        return (
          <Button
            key={identifier}
            variant={'default'}
            type="button"
            onClick={() => onToggle(identifier)}
            aria-pressed={active}
            className={cn(
              'rounded-4xl text-sm leading-none  h-9',
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-transparent hover:bg-muted text-foreground',
            )}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
