import type { ComponentProps } from 'react';

import { cn } from '@/_shared/lib/cn';
import { ControlTriggerButton } from '@/_shared/ui/control';

import {
  getFilterTriggerLabel,
  getFilterTriggerSummary,
  type FilterTriggerSource,
} from './filter-group';

interface FilterTriggerProps extends ComponentProps<'button'> {
  group: FilterTriggerSource;
}

// [모든 타입 ⌄] / [불꽃 ⌄] / [불꽃 +2 ⌄]. 팝오버·시트의 render로 쓰여 열기 props를 받아 넘긴다.
// 고른 게 있으면 selected 모양. data-filter-trigger는 초기화 뒤 포커스를 돌려줄 대상 (focusVisibleFilterTrigger)
export function FilterTrigger({
  group,
  className,
  ...props
}: FilterTriggerProps) {
  const { first, rest } = getFilterTriggerSummary(group);

  return (
    <ControlTriggerButton
      data-filter-trigger
      variant={first === null ? 'default' : 'active'}
      aria-label={getFilterTriggerLabel(group)}
      className={cn('h-10 max-w-60', className)}
      {...props}
    >
      {/* '모든 타입' / '불꽃' / '불꽃 +2' (처음 고른 값 + 나머지 수) */}
      <span aria-hidden className="flex min-w-0 items-center gap-1.5">
        {first === null ? (
          <span className="truncate">모든 {group.title}</span>
        ) : (
          <>
            <span className="truncate font-medium">{first}</span>
            {rest > 0 && (
              <span className="shrink-0 tabular-nums font-medium">+{rest}</span>
            )}
          </>
        )}
      </span>
    </ControlTriggerButton>
  );
}
