import { CheckIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { SORT_OPTIONS, getOrderOptions } from '../../model/sort';
import type { SortProps } from './sort-props';

/**
 * 정렬 선택지 (1열):
 *   이름
 *   위력                    ✓     ← 고른 줄: 이름 아래 작은 글자로 지금 방향
 *   높은 순
 * 다른 줄을 누르면 그 기준의 첫 방향으로, 고른 줄을 다시 누르면 반대 방향 (표 머리글과 같은 규칙).
 * 방향은 이름 아래(왼쪽)에 둔다: 모바일에서 줄 오른쪽을 엄지로 누르면 오른쪽 글자가 가려서
 */
export default function SortOptionList({
  sortState,
  onSelectKey,
  onSelectOrder,
}: SortProps) {
  const orderOptions = getOrderOptions(sortState.sort);
  const current = orderOptions.find(({ order }) => order === sortState.order);
  const next = orderOptions.find(({ order }) => order !== sortState.order);

  return (
    <div className={cn('flex flex-col')}>
      {SORT_OPTIONS.map(({ key, label }) => {
        const isSelected = key === sortState.sort;

        return (
          <Button
            key={key}
            variant="ghost"
            aria-pressed={isSelected}
            aria-label={
              isSelected && current && next
                ? `${label}, ${current.label}. 다시 누르면 ${next.label}`
                : label
            }
            onClick={() => {
              if (!isSelected) {
                onSelectKey(key);
              } else if (next) {
                onSelectOrder(next.order);
              }
            }}
            className={cn(
              'flex w-full cursor-pointer flex-row items-center justify-between gap-x-3.5 rounded-xl px-3 py-2 text-md transition-none',
              'hover:bg-accent active:bg-accent dark:hover:bg-accent dark:active:bg-accent',
              isSelected ? 'h-15' : 'h-11',
            )}
          >
            <span aria-hidden className={cn('flex min-w-0 flex-col text-left')}>
              <span className={cn('block truncate')}>{label}</span>
              {isSelected && current && (
                <span
                  className={cn(
                    'block truncate text-sm font-medium text-foreground/70',
                  )}
                >
                  {current.label}
                </span>
              )}
            </span>
            {isSelected && (
              <CheckIcon aria-hidden className={cn('size-4.75 shrink-0')} />
            )}
          </Button>
        );
      })}
    </div>
  );
}
